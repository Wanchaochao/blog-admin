<template>
    <Card>
        <Row type="flex" justify="start">
            <Col span="12">
                <Form ref="articleForm" :model="formData" :label-width="100">
                    <Row>
                        <Col span="12">
                            <FormItem label="title" prop="title"
                                      :rules="{required:true,message:'title is required!',trigger: 'blur'}">
                                <Input v-model="formData.title" placeholder="the title of this article"></Input>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="8">
                            <FormItem label="category_id" prop="category_id"
                                      :rules="{required:true,message:'category is required!',trigger: 'change', type: 'number'}">
                                <Select v-model="formData.category_id" placeholder="choose a category for your article at best">
                                    <Option :value="cate.id" v-for="cate in categories">{{ cate.name }}</Option>
                                </Select>
                            </FormItem>

                        </Col>
                    </Row>
                    <Row>
                        <Col span="20">
                            <FormItem label="author" prop="author"
                                      :rules="{required:true,message:'author is required!'}">
                                <Input v-model="formData.author"
                                       placeholder="description for this article"></Input>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="20">
                            <FormItem label="description" prop="description"
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
                            </FormItem>
                        </Col>
                    </Row>

                </Form>
            </Col>
        </Row>
    </Card>
</template>

<script>
import {Process} from '../../util/co'
import {mapActions} from 'vuex'
import Markdown from '_c/markdown'

export default {
  name: 'edit',
  components: {Markdown},
  data () {
    return {
      categories: [],
      formData: {
        title: '',
        author: '',
        category_id: 0,
        description: '',
        content: ''
      },
      editorConfig: {
        options: {},
        localCache: false
      }
    }
  },
  methods: {
    ...mapActions('articles', ['getCate', 'getArticle', 'updateArticle']),
    handleSubmit (name) {
      console.log(this.formData)
      this.$refs[name].validate((valid) => {
        if (valid) {
          // this.$Message.success('验证通过')
          // 验证通过,提交表单
          let me = this
          Process(function* () {
            me.formData.category_id = parseInt(me.formData.category_id)
            yield me.updateArticle(me.formData)
            me.$Message.success('更新成功')
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
  mounted () {
    let me = this
    let post = {id: parseInt(this.$route.query.id)}
    Process(function* () {
      me.categories = yield me.getCate()
      let res = yield me.getArticle(post)
      delete res.updated_at
      delete res.created_at
      me.formData = res
      me.$refs.markdown.setContent(me.formData.content)
    })
  }
}
</script>

<style scoped>

</style>
