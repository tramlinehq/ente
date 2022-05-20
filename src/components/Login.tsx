import constants from 'utils/strings/constants';
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { getOtt } from 'services/userService';
import { setData, LS_KEYS, getData } from 'utils/storage/localStorage';
import { PAGES } from 'constants/pages';
import FormPaperTitle from './Form/FormPaper/Title';
import { Divider } from '@mui/material';
import FormPaperFooter from './Form/FormPaper/Footer';
import LinkButton from './pages/gallery/LinkButton';
import SingleInputForm, { SingeInputFormProps } from './SingleInputForm';

interface LoginProps {
    signUp: () => void;
}

export default function Login(props: LoginProps) {
    const router = useRouter();

    useEffect(() => {
        const main = async () => {
            router.prefetch(PAGES.VERIFY);
            const user = getData(LS_KEYS.USER);
            if (user?.email) {
                await router.push(PAGES.VERIFY);
            }
        };
        main();
    }, []);

    const loginUser: SingeInputFormProps['callback'] = async (
        email,
        setFieldError
    ) => {
        try {
            await getOtt(email);
            setData(LS_KEYS.USER, { email });
            router.push(PAGES.VERIFY);
        } catch (e) {
            setFieldError(`${constants.UNKNOWN_ERROR} ${e.message}`);
        }
    };

    return (
        <>
            <FormPaperTitle>{constants.LOGIN}</FormPaperTitle>
            <SingleInputForm
                callback={loginUser}
                fieldType="email"
                placeholder={constants.ENTER_EMAIL}
                buttonText={constants.LOGIN}
            />
            <Divider />
            <FormPaperFooter>
                <LinkButton onClick={props.signUp}>
                    {constants.NO_ACCOUNT}
                </LinkButton>
            </FormPaperFooter>
        </>
    );
}
