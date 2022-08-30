import { memo } from 'react';
import Image from 'next/future/image';
import { Delete, ImageSearch } from '@mui/icons-material';
import { Fancybox } from '~/components/Fancybox';
import images from '~/assets/images';

function SliderPreview({ data = [], onDelete }) {
	return (
		<>
			{data.length ? (
				<ul className="tw-list-none tw-overflow-x-hidden tw-overflow-y-scroll tw-p-0 tw-pr-4 tw-max-h-96 custom-scrollbar">
					{data.map((item) => (
						<li key={item.name} className="tw-flex tw-items-start tw-content-start tw-mb-3">
							<div className="tw-mr-3">
								<Fancybox options={{ infinite: false }}>
									<Image
										className="tw-bg-slate-100 tw-border tw-border-solid tw-border-neutral-300 tw-p-1 tw-rounded-md tw-align-top"
										src={item.preview ?? images.noImage}
										width={60}
										height={60}
										alt={item.name}
										loading="lazy"
										data-fancybox="SliderPreviewAvatar"
										data-src={item.preview ?? images.noImage}
									/>
								</Fancybox>
							</div>
							<div>
								<div className="tw-text-sm tw-mb-1">{item.name}</div>
								<div className="actions">
									<div className="tw-inline-block">
										<span
											className="tw-flex tw-items-center tw-contents-start tw-cursor-pointer tw-text-red-500 hover:tw-text-red-700 tw-text-sm"
											onClick={() => onDelete(item)}
										>
											<Delete fontSize="small" />
											<span className="tw-pt-1 tw-pl-1">Delete</span>
										</span>
									</div>
									<div className="tw-inline-block tw-ml-3">
										<Fancybox options={{ infinite: false }}>
											<span
												className="tw-flex tw-items-center tw-contents-start tw-cursor-pointer tw-text-blue-500 hover:tw-text-blue-700 tw-text-sm"
												data-fancybox="SliderPreviewSingle"
												data-src={item.preview ?? images.noImage}
											>
												<ImageSearch fontSize="small" />
												<span className="tw-pt-1 tw-pl-1">View</span>
											</span>
										</Fancybox>
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

export default memo(SliderPreview);
