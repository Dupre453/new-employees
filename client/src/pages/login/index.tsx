import React from 'react'
import {Layout} from "../../components/layout";
import {Card, Form, Row} from "antd";


export const Login = () => {
    return (

        <Layout>
            <Row align='middle' justify='center'>
                <Card title='Войдите' style={{width: "480px"}}>
                    <Form onFinish={() => null}>
                       <Input/>
                    </Form>
                </Card>
            </Row>
        </Layout>

    );
};

