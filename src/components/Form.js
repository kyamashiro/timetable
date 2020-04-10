import React from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import { Formik } from 'formik'
import * as yup from 'yup'

/**
 * Formik TextInput Form: stateless component
**/
export default Form = ({ onSubmitHandler,
    namePlaceholder,
    emailPlaceholder,
    messagePlaceholder,
    submitTitle,
    schemaRequiredName,
    schemaRequiredEmail,
    schemaRequiredMessage }) => {

    /**
    * Schema for input validation
    **/
    const schema = yup.object({
        name: yup.string().required(schemaRequiredName).min(4),
        email: yup.string().required(schemaRequiredEmail).email(schemaRequiredEmail),
        message: yup.string().required(schemaRequiredMessage)
    })

    return (
        <Formik
            validationSchema={schema}
            initialValues={{ email: '', name: '', message: '' }}
            onSubmit={(values, actions) => {
                actions.resetForm();
                onSubmitHandler(values);
            }}
        >
            {({ handleChange, handleBlur, handleSubmit, values, touched, errors }) => (
                <View>
                    <TextInput
                        onChangeText={handleChange('name')}
                        onBlur={handleBlur('name')}
                        value={values.name}
                        placeholder={namePlaceholder}
                        style={styles.input}
                    />

                    <Text style={styles.error}>{touched.name && errors.name}</Text>

                    <TextInput
                        onChangeText={handleChange('email')}
                        onBlur={handleBlur('email')}
                        value={values.email}
                        placeholder={emailPlaceholder}
                        style={styles.input}
                    />

                    <Text style={styles.error}>{touched.email && errors.email}</Text>

                    <TextInput
                        onChangeText={handleChange('message')}
                        onBlur={handleBlur('message')}
                        value={values.message}
                        placeholder={messagePlaceholder}
                        multiline minHeight={100}
                        style={styles.input}
                    />

                    <Text style={styles.error}>{touched.message && errors.message}</Text>

                    <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                        <Text style={styles.buttonText}>{submitTitle}</Text>
                    </TouchableOpacity>
                </View>
            )}
        </Formik>
    )
}

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderColor: '#f2f9fc',
        padding: 10,
        fontSize: 18,
        borderRadius: 7,
    },
    error: {
        color: '#bf283f',
        marginBottom: 10,
        marginTop: 7,
        textAlign: 'center',
    },
    button: {
        borderRadius: 15,
        paddingVertical: 10,
        paddingHorizontal: 10,
        backgroundColor: '#99b1c2',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        fontSize: 17,
        textAlign: 'center',
    }
})

