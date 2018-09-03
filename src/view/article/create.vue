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
                            <FormItem label="category" prop="categoryId"
                                      :rules="{required:true,message:'category is required!',trigger: 'change'}">
                                <Select v-model="formData.categoryId" placeholder="Select your city">
                                    <Option value="1">Linux</Option>
                                    <Option value="2">Mysql</Option>
                                    <Option value="3">Php</Option>
                                    <Option value="4">Golang</Option>
                                    <Option value="5">web</Option>
                                </Select>
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
                        <Col span="20">
                            <FormItem label="content" prop="content" :rules="{required:true,message:'content is required!'}">
                                <Input v-model="formData.content" type="textarea" :autosize="{minRows: 5,maxRows: 10}"
                                       placeholder="the content..."></Input>
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
import {mapActions} from 'vuex'
import {Process} from '../../util'
export default {
  name: 'create',
  data () {
    return {
      formData: {
        title: '',
        categoryId: '',
        description: '',
        content: ''
      },
      ruleValidate: {
        title: [
          { required: true, message: 'Please write the title', trigger: 'change' }
        ],
        author: [
          { required: true, type: 'array', min: 1, message: 'Choose at least one hobby', trigger: 'change' },
          { type: 'array', max: 2, message: 'Choose two hobbies at best', trigger: 'change' }
        ],
        categoryId: [
          { required: true, message: 'Please select gender', trigger: 'change' },
          { type: 'numeric', max: 100, message: 'Choose a category at best', trigger: 'change' }
        ],
        content: [
          { required: true, type: 'array', min: 1, message: 'Choose at least one hobby', trigger: 'change' },
          { type: 'array', max: 2, message: 'Choose two hobbies at best', trigger: 'change' }
        ],
        description: [
          { required: true, message: 'Please enter a personal introduction', trigger: 'blur' },
          { type: 'string', min: 8, message: 'Introduce no less than 8 words', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    ...mapActions('articles', ['storeArticle']),
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$Message.success('验证通过')
          // 验证通过,提交表单
          let me = this
          Process(function *() {
            yield me.storeArticle(me.formData)
            me.$router.push({path: '/admin/articleList'})
          })
        } else {
          this.$Message.error('验证失败')
        }
      })
    },
    handleReset (name) {
      this.$refs[name].resetFields()
    }

  }
}
</script>

<style scoped>

</style>
