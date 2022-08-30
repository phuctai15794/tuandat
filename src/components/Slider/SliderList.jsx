import { memo } from 'react';
import Image from 'next/future/image';
import images from '~/assets/images';

const SliderList = () => {
	const data = [
		{
			photo: 'https://i.picsum.photos/id/244/70/70.jpg?hmac=YlvDLXFCAXsq4GspcIdX3jodn6ysMue46rQYIoSZKdc',
			name: 'Non nulla laborum ea voluptate fugiat',
			type: 'Full'
		},
		{
			photo: 'https://i.picsum.photos/id/189/70/70.jpg?hmac=dfhlKdplufBznGNMO81F0ozjfFJUrUQ02LrMvKr4zvI',
			name: 'Non ullamco incididunt irure elit irure',
			type: 'Advertise'
		},
		{
			photo: 'https://i.picsum.photos/id/98/70/70.jpg?hmac=8iTVjWcixrXVWqF02O3kI99gSbD3P1JhBN3PTzlp-Co',
			name: 'Dolore quis aliqua velit nisi',
			type: 'Factory'
		},
		{
			photo: 'https://i.picsum.photos/id/196/70/70.jpg?hmac=Y_7L4KHDadmcf7QEbtumoHdpA-kwwX2wPzQBb_qMQAA',
			name: 'Eu minim magna enim aliquip excepteur culpa',
			type: 'Partner'
		}
	];

	return (
		<>
			<div className="tw-overflow-x-auto tw-relative tw-shadow-md tw-rounded-lg">
				<table className="tw-w-full tw-text-sm tw-text-left tw-text-gray-500">
					<thead className="tw-text-xs tw-text-neutral-500 tw-uppercase tw-bg-gray-300">
						<tr>
							<th scope="col" className="tw-py-3 tw-px-4">
								Photo
							</th>
							<th scope="col" className="tw-py-3 tw-px-4">
								Name
							</th>
							<th scope="col" className="tw-py-3 tw-px-4 tw-text-center">
								Type
							</th>
						</tr>
					</thead>
					<tbody>
						{data.map((item) => (
							<tr key={item.name} className="tw-bg-white tw-border-b hover:tw-bg-gray-50">
								<th className="tw-py-3 tw-px-4 tw-text-center">
									<Image
										className="tw-bg-slate-100 tw-border tw-border-solid tw-border-neutral-300 tw-p-1 tw-rounded-md tw-align-top"
										src={item.photo ?? images.noImage}
										width={70}
										height={70}
										alt={item.name}
									/>
								</th>
								<td className="tw-py-3 tw-px-4">{item.name}</td>
								<td className="tw-py-3 tw-px-4 tw-text-center">{item.type}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			{/* <FormControl fullWidth margin="normal">
				<TextField
					id="slider-alt"
					required
					size="medium"
					variant="outlined"
					label="Alt"
					value={alt}
					error={errorField === 'alt' && !alt ? true : false}
					onChange={(e) => handleChangeInput(e, 'alt')}
				/>
			</FormControl>
			<FormControl fullWidth margin="normal">
				<TextField
					id="slider-link"
					required
					size="medium"
					variant="outlined"
					label="Link"
					value={link}
					error={errorField === 'link' && !link ? true : false}
					onChange={(e) => handleChangeInput(e, 'link')}
				/>
			</FormControl>
			<FormControlLabel control={<Checkbox defaultChecked />} label="Active" /> */}
		</>
	);
};

export default memo(SliderList);
