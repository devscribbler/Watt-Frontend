import { ChangeEmailIntendFormTypes } from '~/store/reducers/changeEmail/extraReducers'

export function setEmailToSessionStorage({ email }: ChangeEmailIntendFormTypes): void {
  sessionStorage.setItem('newEmailIntend', email)
}

export function removeEmailFromSessionStorage(): void {
  sessionStorage.removeItem('newEmailIntend')
}
