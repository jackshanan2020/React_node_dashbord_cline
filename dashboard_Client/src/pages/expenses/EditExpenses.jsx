import { Card, Typography, Container,CardContent, Stack } from '@mui/material'
import React from 'react'
import Scrollbar from '../../components/Scrollbar'
import Page from '../../components/Page'
import AddExpensesForm from '../../sections/@dashboard/expenses/AddExpenses'
//  -------------------------------------------------

export default function EditExpenses() {
    return (
        <Page title='Add Expenses'>
            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        Expenses
                    </Typography>
                </Stack>
                <Card>
                    <CardContent>
                    <Scrollbar>
                        <AddExpensesForm />
                    </Scrollbar>
                    </CardContent>
                </Card>
            </Container>

        </Page>
    )
}
