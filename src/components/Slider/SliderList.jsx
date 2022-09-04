import { memo, useMemo, useState } from 'react';
import Image from 'next/future/image';
import PropTypes from 'prop-types';
import { Delete } from '@mui/icons-material';
import config from '~/config';
import images from '~/assets/images';
import Fancybox from '~/components/Fancybox';
import { SliderConfirm } from '~/components/Slider';

function SliderList({ data = [], onDelete }) {
	const sliderTypes = useMemo(() => config.slider.positions, []);

	const [openDialog, setOpenDialog] = useState(false);
	const [itemToDelete, setItemToDelete] = useState(null);

	const handleClose = () => {
		setOpenDialog(false);
	};

	const handleConfirmDelete = (item) => {
		if (item) {
			setOpenDialog(true);
			setItemToDelete(item);
		}
	};

	return (
		<>
			<div className="tw-relative tw-overflow-x-auto tw-overflow-y-scroll tw-max-h-96 tw-shadow-md tw-rounded-lg custom-scrollbar">
				<table className="tw-w-full tw-text-sm tw-text-left tw-text-gray-500">
					<thead className="tw-sticky tw-top-0 tw-text-xs tw-text-neutral-500 tw-uppercase tw-bg-gray-300">
						<tr>
							<th scope="col" className="tw-py-3 tw-px-4 tw-text-center">
								Photo
							</th>
							<th scope="col" className="tw-py-3 tw-px-4 tw-text-center">
								Position
							</th>
							<th scope="col" className="tw-py-3 tw-px-4 tw-text-center">
								Action
							</th>
						</tr>
					</thead>
					<tbody>
						{data &&
							data.map((item) => {
								let sliderTypeByItem = sliderTypes.find(
									(sliderType) => sliderType.id === item.position
								);

								return (
									<tr key={item._id} className="tw-bg-white tw-border-b hover:tw-bg-gray-50">
										<th className="tw-py-3 tw-px-4 tw-text-center">
											<Fancybox options={{ infinite: false }}>
												<Image
													className="tw-bg-slate-100 tw-border tw-border-solid tw-border-neutral-300 tw-p-1 tw-rounded-md tw-align-top"
													src={item.image_url ?? images.noImage}
													width={70}
													height={70}
													alt={item.image_url}
													loading="lazy"
													data-fancybox="SliderList"
													data-src={item.image_url ?? images.noImage}
												/>
											</Fancybox>
										</th>
										<td className="tw-py-3 tw-px-4 tw-text-center">{sliderTypeByItem.title}</td>
										<td className="tw-py-3 tw-px-4 tw-text-center">
											<span
												className="tw-text-red-600 hover:tw-text-red-800 tw-cursor-pointer"
												onClick={() => handleConfirmDelete(item)}
											>
												<Delete fontSize="small" />
											</span>
										</td>
									</tr>
								);
							})}
					</tbody>
				</table>
			</div>
			<SliderConfirm open={openDialog} data={itemToDelete} onClose={handleClose} onDelete={onDelete} />
		</>
	);
}

SliderList.propTypes = {
	data: PropTypes.array.isRequired,
	onDelete: PropTypes.func.isRequired
};

export default memo(SliderList);
