/api/v1/login

requset: {
    username: String,
    pwd: String

}

response: {
    status: Number,
    msg: '',
    data: {
        id: '',
        avatar: '',
        displayName: '',
        username: '',
        email: '',
        role: Array,
        pages: Array
    }
}