module.exports = {
    db: "mongodb://localhost/mean",
    port: 80,
    app: {
        name: "Gutenberg's Box - Production"
    },
    facebook: {
        clientID: "464382397004959",
        clientSecret: "c150430822e40fd2638cbb5debffe701",
        callbackURL: "http://gutenbergs-box.uni.me/auth/facebook/callback"
    },
    twitter: {
        clientID: "CONSUMER_KEY",
        clientSecret: "CONSUMER_SECRET",
        callbackURL: "http://localhost:3000/auth/twitter/callback"
    },
    github: {
        clientID: "5d9e3d00e60ed72c0ba7",
        clientSecret: "1cc8bddbb6a8a95319c4961fb9313ed49a76f9dc",
        callbackURL: "http://gutenbergsbox.uni.me/auth/github/callback"
    },
    google: {
        clientID: "APP_ID",
        clientSecret: "APP_SECRET",
        callbackURL: "http://localhost:3000/auth/google/callback"
    }
}
