module.exports = {
    db: "mongodb://localhost/mean-dev",
    app: {
        name: "Gutenberg's Box - Development"
    },
    facebook: {
        clientID: "218491238333832",
        clientSecret: "0b1e2718e2e01160f428c52bbe4a24f7",
        callbackURL: "http://localhost:3000/auth/facebook/callback"
    },
    twitter: {
        clientID: "CONSUMER_KEY",
        clientSecret: "CONSUMER_SECRET",
        callbackURL: "http://localhost:3000/auth/twitter/callback"
    },
    github: {
        clientID: "6cd961294a1bf1177865",
        clientSecret: "100d8bdc3785f2a2ba2bd01f263b01367d2ff1fb",
        callbackURL: "http://localhost:3000/auth/github/callback"
    },
    google: {
        clientID: "APP_ID",
        clientSecret: "APP_SECRET",
        callbackURL: "http://localhost:3000/auth/google/callback"
    }
}
