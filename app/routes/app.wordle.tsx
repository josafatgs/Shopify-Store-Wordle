import React, { useState } from 'react';
import { TitleBar } from '@shopify/app-bridge-react';
import { Page, Layout, Card, Form, FormLayout, TextField, Button } from '@shopify/polaris';

export default function Wordle() {
    const [word, setWord] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleWordChange = (value) => setWord(value);

    const handleSubmit = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('/admin/set-word', 
                { 
                    method: "POST",
                    body: JSON.stringify(word)
                }
            );
            if (response.status === 201) {
                alert('Word of the day set successfully');
            }
        } catch (error) {
            alert('Error setting word of the day');
        }
        setIsLoading(false);
        setWord('');
    };

    return (
        <Page>
            <TitleBar title="Set Word of the Day" />
            <Layout>
                <Layout.Section>
                    <Card>
                        <Form onSubmit={handleSubmit}>
                            <FormLayout>
                                <TextField
                                    label="Word of the Day"
                                    value={word}
                                    onChange={handleWordChange}
                                    autoComplete="off"
                                />
                                <Button variant='primary' submit loading={isLoading}>
                                    Set Word
                                </Button>
                            </FormLayout>
                        </Form>
                    </Card>
                </Layout.Section>
            </Layout>
        </Page>
    );
}
