import {
    Anchor,
    Button,
    Paper,
    PasswordInput,
    Text,
    TextInput,
    Title,
    Stack
} from '@mantine/core';
import classes from './login.module.css';
import { registerWithEmailAndPassword } from 'hooks/firebase';
import { useNavigate } from "@tanstack/react-router";
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';

interface RegisterProps {
    email: string;
    password: string;
    confirmPassword: string;
}

export function Register() {
    const form = useForm<RegisterProps>({
        initialValues: {
            email: '',
            password: '',
            confirmPassword: ''
        },
        validate: {
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
            password: (value) => (value.length < 6 ? 'Password must be at least 6 characters' : null),
            confirmPassword: (value, values) =>
                value !== values.password ? 'Passwords do not match' : null,
        }
    });
    const navigate = useNavigate();

    const handleSubmitRegister = (values: RegisterProps) => {
        const { email, password } = values;
        registerWithEmailAndPassword(email, password, navigate).catch((error) => {
            notifications.show({
                title: 'Registration failed',
                message: error.message,
                color: 'red'
            })
        });
    }

    return (
        <form className={classes.wrapper} onSubmit={form.onSubmit(handleSubmitRegister)}>
            <Paper className={classes.form} radius={0} p={30}>
                <Title order={2} className={classes.title} ta="center" mt="md" mb={50}>
                    Create your account
                </Title>

                <TextInput 
                    label="Email address" 
                    placeholder="hello@gmail.com" 
                    size="md" 
                    {...form.getInputProps('email')} 
                />
                <PasswordInput 
                    label="Password" 
                    placeholder="Your password" 
                    mt="md" 
                    size="md" 
                    {...form.getInputProps('password')}
                />
                <PasswordInput 
                    label="Confirm Password" 
                    placeholder="Confirm your password" 
                    mt="md" 
                    size="md" 
                    {...form.getInputProps('confirmPassword')}
                />
                
                <Stack mt={'xl'}>
                    <Button type='submit' fullWidth size="md">
                        Register
                    </Button>
                </Stack>

                <Text ta="center" mt="md">
                    Already have an account?{' '}
                    <Anchor<'a'> href="#" fw={700} onClick={(event) => event.preventDefault()}>
                        Login
                    </Anchor>
                </Text>
            </Paper>
        </form>
    );
}