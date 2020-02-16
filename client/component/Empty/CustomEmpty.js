import React from 'react';
import { InboxOutlined } from '@ant-design/icons';
const RenderEmpty = () => (
	<div style={{ textAlign: 'center' }}>
		<InboxOutlined style={{ fontSize: 35 }} />
		<p>No Request yet</p>
	</div>
);
export default RenderEmpty;
