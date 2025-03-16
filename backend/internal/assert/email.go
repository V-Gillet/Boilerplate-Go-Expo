package assert

import "net/mail"

func Email(email string) error {
    _, err := mail.ParseAddress(email)

    return err
}