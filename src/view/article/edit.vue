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
                                <Select v-model="formData.category_id" placeholder="choose a category for your article at best">
                                    <Option :value="cate.id.toString()" v-for="cate in categories">{{ cate.name }}</Option>
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
                            </FormItem>
                        </Col>
                    </Row>

                </Form>
            </Col>
        </Row>
    </Card>
</template>

<script>
export default {
  name: 'edit',
  data () {
    return {
      categories: [],
      formData: {
        title: '',
        author: '',
        category_id: '',
        description: '',
        content: ''
      }
    }
  },
  methods: {

  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      Process(function* () {
        vm.categories = yield vm.getCate()
        vm.article = yield vm.getArticle()
      })
    })
  }
}
</script>

<style scoped>

</style>
