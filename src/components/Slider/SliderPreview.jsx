import Image from 'next/image';
import { Delete } from '@mui/icons-material';
import images from '~/assets/images';

export function SliderPreview({ data = [], onDelete }) {
	return (
		<>
			{data.length ? (
				<ul className="tw-list-none tw-overflow-x-hidden tw-overflow-y-scroll tw-p-0 tw-pr-4 tw-max-h-96">
					{data.map((item) => (
						<li key={item.name} className="tw-flex tw-items-start tw-content-start tw-mb-3">
							<div className="tw-mr-3">
								<Image
									className="tw-rounded-md tw-align-top"
									src={item.preview ?? images.noImage}
									width={60}
									height={60}
									alt={item.name}
								/>
							</div>
							<div>
								<div className="tw-text-sm">{item.name}</div>
								<div className="actions">
									<div className="tw-inline-block">
										<span
											className="tw-flex tw-items-center tw-contents-start tw-cursor-pointer tw-text-red-500 hover:tw-text-red-700 tw-text-sm"
											onClick={() => onDelete(item)}
										>
											<Delete fontSize="small" />
											<span className="tw-pt-1">Delete</span>
										</span>
									</div>
								</div>
							</div>
						</li>
					))}
				</ul>
			) : null}
		</>
	);
}
