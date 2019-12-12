<template>
    <div>
        <Card>
            <Row type="flex" justify="space-between">
                <Col>
                    <div class="search-con search-con-top">
                        <Button type="success" to="/articles/createArticle">{{ $t('createArticle') }}</Button>
                    </div>
                </Col>
                <Col>
                    <div class="search-con search-con-top">
                        <Select v-model="searchKey" class="search-col">
                            <Option v-for="item in columns" v-if="item.searchable === true" :value="item.key"
                                    :key="`search-col-${item.key}`">{{ item.title }}
                            </Option>
                        </Select>
                        <Input @on-change="handleClear" clearable :placeholder="$t('enterKeyWords')"
                               class="search-input"
                               v-model="searchValue"/>
                        <Button @click="handleSearch" class="search-btn" type="primary">
                            <Icon type="search"/>&nbsp;&nbsp;{{ $t('search') }}
                        </Button>
                    </div>
                </Col>
            </Row>
            <tables ref="tables" editable search-place="top" v-model="articles" :columns="columns"
                    @on-delete="handleDelete" @on-edit="handleEdit"/>
            <div style="margin: 10px;overflow: hidden">
                <div style="float: right;">
                    <page :total="total" :current="current" @on-change="changePage" v-if="current > 0"></page>
                </div>
            </div>
        </Card>
    </div>
</template>

<script>
import Tables from '_c/tables'
import {Process} from '../../util/co'
import co from 'co'
import {getArticles, deleteArticle} from '../../service'

export default {
  name: 'articleList',
  methods: {
    handleDelete: (params) => {
      co(function* () {
        return yield deleteArticle({id: params.row.id})
      }).catch(e => {
        throw e
      })
    },
    handleClear (e) {
      this.$refs.tables.handleClear(e)
    },
    handleEdit: (params, vm) => {
      vm.$router.push({name: 'editArticle', query: {id: params.row.id}})
    },
    handleSearch () {
      let me = this
      if (me.searchValue && me.searchKey) {
        this.$refs.tables.handleSearch(me.searchKey, me.searchValue)
      }
    },
    getArticles (p) {
      let me = this
      co(function* () {
        let res = yield getArticles(p)
        me.total = parseInt(res.data.page.total)
        me.current = parseInt(res.data.page.current)
        me.articles = res.data.list
      }).catch(e => {
        throw e
      })
    },
    changePage (page) {
      this.getArticles({page})
    }
  },
  mounted () {
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      let data = {page: 1}
      vm.getArticles(data)
    })
  },
  components: {
    Tables
  },
  computed: {
    columns () {
      return [
        {title: this.$t('id'), key: 'id', sortable: true, width: 100, align: 'center'},
        {title: this.$t('title'), key: 'title', sortable: false, searchable: true, align: 'center'},
        {title: this.$t('category'), key: 'Category', sortable: false, searchable: true, align: 'center'},
        {title: this.$t('author'), key: 'author', sortable: false, searchable: true, align: 'center'},
        {title: this.$t('description'), key: 'description', sortable: false, searchable: true, align: 'center'},
        {title: this.$t('created_at'), key: 'created_at', sortable: true, searchable: true, align: 'center'},
        {title: this.$t('updated_at'), key: 'updated_at', sortable: true, searchable: true, align: 'center'},
        {title: this.$t('handle'), key: 'handle', options: ['delete', 'edit']
        }
      ]
    }
  },
  data () {
    return {
      articles: [],
      total: 0,
      current: 0,
      searchKey: '',
      searchValue: '',
      tableData: []
    }
  },
  watch: {}
}
</script>

<style scoped>

</style>
