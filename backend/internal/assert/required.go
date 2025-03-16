package assert

import (
	"errors"
	"fmt"
	"reflect"
)

func Required(args interface{}, requiredFields []string) error {
	v := reflect.ValueOf(args)

    for _, field := range requiredFields {
        f := v.FieldByName(field)
        if !f.IsValid() {
            return errors.New(fmt.Sprintf("Field %s is required", field))
        }

        if isEmptyValue(f) {
            return errors.New(fmt.Sprintf("Field %s is required", field))
        }
    }

    return nil
}

func isEmptyValue(v reflect.Value) bool {
	switch v.Kind() {
	case reflect.String, reflect.Array:
		return v.Len() == 0
	case reflect.Bool:
		return !v.Bool()
	case reflect.Int, reflect.Int8, reflect.Int16, reflect.Int32, reflect.Int64:
		return v.Int() == 0
	case reflect.Uint, reflect.Uint8, reflect.Uint16, reflect.Uint32, reflect.Uint64, reflect.Uintptr:
		return v.Uint() == 0
	case reflect.Float32, reflect.Float64:
		return v.Float() == 0
	case reflect.Interface, reflect.Ptr:
		return v.IsNil()
	}
	return false
}
