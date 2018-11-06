<template>
    <Card>
        <Row type="flex" justify="start">
            <Col span="12">
                <Form ref="articleForm" :model="formData" :label-width="100">
                    <Row>
                        <Col span="12">
                            <FormItem :label="$t('title')" prop="title"
                                      :rules="{required:true,message:'title is required!',trigger: 'blur'}">
                                <Input v-model="formData.title" placeholder="the title of this article"></Input>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="8">
                            <FormItem :label="$t('category_id')" prop="category_id"
                                      :rules="{required:true,message:'category is required!',trigger: 'change'}">
                                <Select v-model="formData.category_id" placeholder="choose a category for your article at best">
                                    <Option :value="cate.id.toString()" v-for="cate in categories">{{ cate.name }}</Option>
                                </Select>
                            </FormItem>

                        </Col>
                    </Row>
                    <Row>
                        <Col span="20">
                            <FormItem :label="$t('author')" prop="author"
                                      :rules="{required:true,message:'author is required!'}">
                                <Input v-model="formData.author"
                                       placeholder="description for this article"></Input>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="20">
                            <FormItem :label="$t('description')" prop="description"
                                      :rules="{required:true,message:'description is required!'}">
                                <Input v-model="formData.description"
                                       placeholder="description for this article"></Input>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="50">
                            <FormItem :label="$t('content')" prop="content"
                                      :rules="{required:true,message:'content is required!'}">
                                <Markdown ref="markdown" v-model="formData.content" :options="editorConfig.options" :localCache="editorConfig.localCache"></Markdown>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="8">
                            <FormItem>
                                <Button type="primary" @click="handleSubmit('articleForm')">Submit</Button>
                                <Button @click="handleReset('articleForm')" style="margin-left: 8px">Reset</Button>
                            </FormItem>
                        </Col>
                    </Row>

                </Form>
            </Col>
        </Row>
    </Card>

</template>

<script>
import {mapActions, mapState} from 'vuex'
import {Process} from '../../util/co'
import Markdown from '_c/markdown'

export default {
  name: 'create',
  computed: {
    ...mapState('categories', ['articles'])
  },
  components: {Markdown},
  data () {
    return {
      categories: [],
      formData: {title: '', author: '', category_id: '', description: '', content: ''},
      editorConfig: {options: {}, localCache: false}
    }
  },
  methods: {
    ...mapActions('articles', ['storeArticle', 'getCate']),
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$Message.success('验证通过')
          // 验证通过,提交表单
          let me = this
          Process(function* () {
            console.log(me.formData)
            yield me.storeArticle(me.formData)
            me.$router.push({path: '/articles/articleList'})
          })
        } else {
          this.$Message.error('验证失败')
        }
      })
    },
    handleReset (name) {
      this.$refs[name].resetFields()
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      Process(function* () {
        vm.categories = yield vm.getCate()
      })
    })
  }
}
</script>

<style scoped>

</style>
