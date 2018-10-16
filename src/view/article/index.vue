<template>
    <div>
        <Card>
            <Row type="flex" justify="space-between">
                <Col>
                    <div class="search-con search-con-top">
                        <a @click="createArticle()" class="search-btn" type="primary">
                            <Icon type="search"/>
                            添加文章
                        </a>
                    </div>
                </Col>
                <Col>
                    <div class="search-con search-con-top">
                        <Select v-model="searchKey" class="search-col">
                            <Option v-for="item in columns" v-if="item.searchable === true" :value="item.key"
                                    :key="`search-col-${item.key}`">{{ item.title }}
                            </Option>
                        </Select>
                        <Input @on-change="handleClear" clearable placeholder="输入关键字搜索" class="search-input"
                               v-model="searchValue"/>
                        <Button @click="handleSearch" class="search-btn" type="primary">
                            <Icon type="search"/>&nbsp;&nbsp;搜索
                        </Button>
                    </div>
                </Col>
            </Row>
            <tables ref="tables" editable search-place="top" v-model="articles" :columns="columns"
                    @on-delete="handleDelete"/>
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
    exportExcel () {
      this.$refs.tables.exportCsv({
        filename: `articles-${(new Date()).valueOf()}.csv`
      })
    },
    createArticle () {
      this.$router.push('/admin/createArticle')
    },
    handleClear (e) {
      this.$refs.tables.handleClear(e)
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
        me.total = parseInt(res.data.total)
        me.current = parseInt(res.data.current)
        me.articles = res.data.list
      }).catch(e => {
        throw e
      })
    },
    changePage (page) {
      this.getArticles({page: page})
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
  data () {
    return {
      articles: [],
      total: 0,
      current: 0,
      searchKey: '',
      searchValue: '',
      columns: [
        {title: 'id', key: 'id', sortable: true},
        {title: 'title', key: 'title', sortable: false, searchable: true},
        {title: 'category', key: 'Category', sortable: false, searchable: true},
        {title: 'author', key: 'author', sortable: false, searchable: true},
        {title: 'description', key: 'description', sortable: false, searchable: true},
        {title: 'created_at', key: 'created_at', sortable: true, searchable: true},
        {title: 'updated_at', key: 'updated_at', sortable: true, searchable: true},
        {
          title: '操作',
          key: 'handle',
          options: ['delete'],
          button: [
            (h, params, vm) => {
              return h('Poptip', {
                props: {
                  confirm: true,
                  title: '确定要删除吗?'
                },
                on: {
                  'on-click': () => {
                    vm.$emit('on-delete', params)
                    vm.$emit('input', params.tableData.filter((item, index) => {
                      return index !== params.row.initRowIndex
                    }))
                  }
                }
              })
            }
          ]
        }
      ],
      tableData: []
    }
  },
  watch: {}
}
</script>

<style scoped>

</style>
