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
                            <Option v-for="item in columns" v-if="item.key !== 'handle'" :value="item.key"
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
            <Button style="margin: 10px 0;" type="primary" @click="exportExcel">导出为Csv文件</Button>
        </Card>
    </div>
</template>

<script>
import Tables from '_c/tables'
import {mapActions, mapState} from 'vuex'
import {Process} from '../../util'

export default {
  name: 'articleList',
  methods: {
    ...mapActions('articles', ['getArticles', 'articleList']),
    handleDelete: (params) => {
      console.log(params)
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
    }
  },
  computed: {
    ...mapState('articles', ['articles'])
  },
  mounted () {
    let me = this
    let data = {}
    Process(function* () {
      yield me.getArticles(data)
    })
  },
  components: {
    Tables
  },
  data () {
    return {
      searchKey: '',
      searchValue: '',
      columns: [
        {title: 'ID', key: 'id', sortable: true},
        {title: 'title', key: 'title', sortable: false},
        {title: 'category', key: 'Category', sortable: false},
        {title: 'author', key: 'author', sortable: false},
        {title: 'description', key: 'description', sortable: false},
        {title: 'created_at', key: 'created_at', sortable: true},
        {title: 'updated_at', key: 'updated_at', sortable: true},
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
