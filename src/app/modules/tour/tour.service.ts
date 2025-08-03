import { ITour, ITourType } from "./tour.interface";
import { Tour, TourType } from "./tour.model";
import { tourSearchableFields } from "./tour.constant";
import QueryBuilder from "../../utils/QueryBuilder";
import { deleteImageFromCLoudinary } from "../../config/cloudinary.config";

const createTour = async (payload: ITour) => {
  const tourExits = await Tour.findOne({ title: payload.title });
  if (tourExits) throw new Error("A tour with this title already exists");
  return await Tour.create(payload);
};

const createTourType = async (payload: ITourType) => {
  const tourTypeExits = await Tour.findOne({ title: payload.name });
  if (tourTypeExits) throw new Error("A tour with this type already exists");
  return await TourType.create(payload);
};

const getAllTours = async (query: Record<string, string>) => {
  const queryBuilder = new QueryBuilder(Tour.find(), query);
  const tours = await queryBuilder
    .search(tourSearchableFields)
    .filter()
    .sort()
    .fields()
    .paginate();

  const [data, meta] = await Promise.all([
    tours.build(),
    queryBuilder.getMeta(),
  ]);

  return {
    data,
    meta,
  };
};

const getATour = async (slug: string) => {
  return await Tour.findOne({ slug: slug });
};

const getAllTourTypes = async () => {
  const tours = await Tour.find();
  return tours;
};

const updateTour = async (id: string, payload: Partial<ITour>) => {
  const existingTour = await Tour.findById(id);

  if (!existingTour) {
    throw new Error("Tour not found.");
  }
  if (
    payload.images &&
    payload.images.length > 0 &&
    existingTour.images &&
    existingTour.images.length > 0
  ) {
    payload.images = [...payload.images, ...existingTour.images];
  }

  if (
    payload.deleteImages &&
    payload.deleteImages.length > 0 &&
    existingTour.images &&
    existingTour.images.length > 0
  ) {
    const restDBImages = existingTour.images.filter(
      (imageUrl) => !payload.deleteImages?.includes(imageUrl)
    );

    const updatedPayloadImages = (payload.images || [])
      .filter((imageUrl) => !payload.deleteImages?.includes(imageUrl))
      .filter((imageUrl) => !restDBImages.includes(imageUrl));

    payload.images = [...restDBImages, ...updatedPayloadImages];
  }

  const updatedTour = await Tour.findByIdAndUpdate(id, payload, { new: true });

  if (
    payload.deleteImages &&
    payload.deleteImages.length > 0 &&
    existingTour.images &&
    existingTour.images.length > 0
  ) {
    await Promise.all(
      payload.deleteImages.map((url) => deleteImageFromCLoudinary(url))
    );
  }

  return updatedTour;
};

const updateTourType = async (id: string, payload: Partial<ITourType>) => {
  const tour = await Tour.findById(id);
  if (!tour) throw new Error("Tour not found");
  return await Tour.findByIdAndUpdate(id, payload, { new: true });
};

const deleteTour = async (id: string) => {
  return await Tour.findByIdAndDelete(id);
};

const deleteTourType = async (id: string) => {
  return await TourType.findByIdAndDelete(id);
};

export const tourService = {
  createTour,
  createTourType,
  deleteTourType,
  updateTourType,
  getAllTourTypes,
  getAllTours,
  getATour,
  updateTour,
  deleteTour,
};
