import { ITour, ITourType } from "./tour.interface";
import { Tour, TourType } from "./tour.model";

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

const getAllTours = async () => {
  const tours = await Tour.find();
  return tours;
};

const getAllTourTypes = async () => {
  const tours = await Tour.find();
  return tours;
};

const updateTour = async (id: string, payload: Partial<ITour>) => {
  const tour = await Tour.findById(id);

  if (!tour) throw new Error("Tour not found");

  return await Tour.findByIdAndUpdate(id, payload, { new: true });
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
  updateTour,
  deleteTour,
};
