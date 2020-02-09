import React from 'react';
import { Typography } from 'antd';
import { EditProfileForm } from '../../component/UserCenter/EditProfileForm';
const Paragraph = Typography;

export const EditProfile = () => {
	return (
		<div>
			<Paragraph className='title-middle'>
				<h3>Edit Profile</h3>
			</Paragraph>
			<EditProfileForm></EditProfileForm>
		</div>
	);
};
