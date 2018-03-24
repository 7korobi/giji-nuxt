<template lang="pug">
.outframe
  .contentframe
    .inframe
      br
      c-post(handle="SSAY")
        span
          i.btn.mdi.mdi-facebook(@click="facebook")
          i.btn.mdi.mdi-twitter(@click="twitter")
          i.btn.mdi.mdi-google(@click="google")
          i.btn.mdi.mdi-github-face(@click="github")
          i.btn.mdi.mdi-logout(@click="signout")
        p(v-if="code") {{ code }}
        p(v-if="message") {{ message }}
          
      c-post(handle="TSAY")
        article
          table
            tbody(v-if="credential")
              tr
                th providerId
                td {{ credential.providerId }}
              tr
                th signInMethod
                td {{ credential.signInMethod }}
              tr
                th accessToken
                td {{ credential.accessToken }}
              tr
                th secret
                td {{ credential.secret }}
              tr
                th(colspan="2")
            tbody(v-if="user")
              tr
                th uid
                td {{ user.uid }}
              tr
                th displayName
                td {{ user.displayName }}
              tr 
                th photoURL
                td
                  img(:src="user.photoURL")
              tr(v-if="user.emailVerified")
                th email
                td {{ user.email }}
              tr
                th refreshToken
                td {{ user.refreshToken }}

              tr
                th apiKey
                td {{ user.apiKey }}
              tr
                th authDomain
                td {{ user.authDomain }}
              tr
                th metadata.lastSignInTime
                td
                  timeago(:since="user.metadata.lastSignInTime")
              tr
                th metadata.creationTime
                td
                  timeago(:since="user.metadata.creationTime")

              tr
                th(colspan="2")
            tbody(v-if="user && user.stsTokenManager")
              tr
                th apiKey
                td {{ user.stsTokenManager.apiKey }}
              tr
                th accessToken
                td {{ user.stsTokenManager.accessToken }}
              tr
                th expirationTime
                td
                  timeago(:since="user.stsTokenManager.expirationTime")
              tr
                th(colspan="2")

          code {{ { code, message, user, credential } }}
</template>
<script lang="coffee">
firebase = require "firebase"

module.exports =
  data: ->
    auth: null
    user: null
    credential: null
    code: null
    message: null
  mounted: ->
    firebase.initializeApp env.firebase
    @auth = firebase.auth()
    @auth.setPersistence(firebase.auth.Auth.Persistence.SESSION)
    .then ()=>
      console.log "session persistence"
    .catch ({ @code, @message })=>
    @auth.onAuthStateChanged (@user)=>
      console.log "onAuthStateChanged"
    @auth.onIdTokenChanged (@user)=>
      console.log "onIdTokenChanged"
    @auth.getRedirectResult()
    .then ({@user, @credential})=>
      console.log "getRedirectResult then"
    .catch ({ @code, @message })=>
  
  methods:
    signout: ->
      @auth.signOut()
    facebook: ->
      @auth.signInWithRedirect new firebase.auth.FacebookAuthProvider()
    twitter: ->
      @auth.signInWithRedirect new firebase.auth.TwitterAuthProvider()
    github: ->
      @auth.signInWithRedirect new firebase.auth.GithubAuthProvider()
    google: ->
      @auth.signInWithRedirect new firebase.auth.GoogleAuthProvider()
</script>

<style lang="stylus" scoped>
.mdi
  line-height: 4rem
  font-size:   3rem
</style>
