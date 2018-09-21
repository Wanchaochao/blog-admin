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
                                      :rules="{required:true,message:'category is required!',trigger: 'change'}">
                                <Select v-model="formData.category_id" placeholder="Select your city">
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
                        <Col span="20">
                            <FormItem label="content" prop="content"
                                      :rules="{required:true,message:'content is required!'}">
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
import {Process} from '../../util/co'

export default {
  name: 'create',
  data () {
    return {
      formData: {
        title: '',
        author: '',
        category_id: '',
        description: '',
        content: ''
      },
      ruleValidate: {
        title: [
          {required: true, message: 'Please write the title', trigger: 'change', type: 'string'}
        ],
        author: [
          {
            required: true,
            type: 'string',
            min: 1,
            message: 'Choose at least one hobby',
            trigger: 'change'
          }
        ],
        category_id: [
          {type: 'number', max: 99, message: 'Choose a category at best', trigger: 'change', required: true}
        ],
        content: [
          {
            required: true,
            type: 'string',
            min: 50,
            message: 'write the content of this article at least 50 word',
            trigger: 'change'
          }
        ],
        description: [
          {required: true, message: 'Please enter a description', trigger: 'blur'},
          {type: 'string', min: 4, message: 'Introduce no more than 4 words', trigger: 'blur'}
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
          Process(function* () {
            console.log(me.formData)
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
