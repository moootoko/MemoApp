import { format } from 'date-fns'

export function dateToString(date) {
  if (!date) return ''

  return format(date, 'yyyy/MM/dd HH:mm')
}

export function translateErrors(code) {
  // デフォルトのエラー
  const error = {
    title: 'エラー',
    description: '入力内容をお確かめください。'
  }

  // エラーコードによってdescriptionを返る
  switch (code) {
    case 'auth/invalid-email':
      error.description = 'メールアドレスが不正です。'
      break
    case 'auth/user-disabled':
      error.description = 'アカウントが無効です。'
      break
    case 'auth/user-not-found':
      error.description = 'ユーザーが見つかりませんでした。'
      break
    case 'auth/wrong-password':
      error.description = 'パスワードが間違っています。'
      break
    case 'auth/email-already-in-use':
      error.description = 'メールアドレスがすでに使われています。'
      break
    case 'auth/operation-not-allowed':
      error.description = 'ユーザーが見つかりませんでした。'
      break
    case 'auth/weak-password':
      error.description = 'パスワードが間違っています。'
      break
    default:
  }

  return error
}
