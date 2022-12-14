import { memo } from 'react';
import Image from 'next/future/image';
import PropTypes from 'prop-types';
import { Delete, ImageSearch } from '@mui/icons-material';
import Fancybox from '~/components/Fancybox';
import images from '~/assets/images';

function SliderPreview({ data = [], onDelete }) {
	return (
		<>
			{data.length ? (
				<ul className="tw-list-none tw-overflow-x-hidden tw-overflow-y-scroll tw-max-h-96 tw-p-0 tw-pr-4 custom-scrollbar">
					{data.map((item) => (
						<li key={item.name} className="tw-flex tw-items-start tw-content-start tw-mb-3">
							<div className="tw-mr-3">
								<Fancybox options={{ infinite: false }}>
									<div className="tw-inline-block tw-bg-slate-100 tw-border tw-border-solid tw-border-neutral-300 tw-p-1 tw-rounded-md tw-overflow-hidden">
										<Image
											className="tw-align-top tw-cursor-pointer"
											src={item.preview ?? images.noImage}
											width={60}
											height={60}
											alt={item.name}
											loading="lazy"
											placeholder="blur"
											blurDataURL={images.blur.default.src}
											data-fancybox="SliderPreviewAvatar"
											data-src={item.preview ?? images.noImage}
										/>
									</div>
								</Fancybox>
							</div>
							<div>
								<div className="tw-text-sm tw-mb-1">{item.name}</div>
								<div className="actions">
									<div className="tw-inline-block">
										<span
											className="tw-flex tw-items-center tw-contents-start tw-cursor-pointer tw-text-red-600 hover:tw-text-red-800 tw-text-sm"
											onClick={() => onDelete(item)}
										>
											<Delete fontSize="small" />
											<span className="tw-pt-1 tw-pl-1">Delete</span>
										</span>
									</div>
									<div className="tw-inline-block tw-ml-3">
										<Fancybox options={{ infinite: false }}>
											<span
												className="tw-flex tw-items-center tw-contents-start tw-cursor-pointer tw-text-blue-600 hover:tw-text-blue-800 tw-text-sm"
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

SliderPreview.propTypes = {
	data: PropTypes.array.isRequired,
	onDelete: PropTypes.func.isRequired
};

export default memo(SliderPreview);
