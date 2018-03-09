
module.exports =
  must_signiture: ({ user })->
    unless user?.sign?
      throw new Error "ログインしてください。"

  can_admin: ({ user, potof })->
    unless potof?.idx == "NPC"
      throw new Error "ログインしてください。"
