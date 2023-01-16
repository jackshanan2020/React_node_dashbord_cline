import { useState } from 'react';
// material
import { Container, Stack, Typography, Button, ButtonGroup } from '@mui/material';

//	components
import Page from '../../components/Page';
import {CompanyProfileSettings} from '../../sections/@dashboard/settings';

export default function ApplicationSettings() {
	return (
		<Page title="Setting & configuration">
			<Container>
				<Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
					<Typography variant="h4" gutterBottom>
						Settings & configuration
					</Typography>

					<ButtonGroup variant="outlined">
						<Button onClick={() => {}}>Filter</Button>
						<Button onClick={() => {}}>Add Product</Button>
					</ButtonGroup>
				</Stack>
				<Stack>
					<CompanyProfileSettings/>
				</Stack>
			</Container>
		</Page>
	);
}
