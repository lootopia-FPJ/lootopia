import axiosClient from './axiosClient';

export const validateStageByAR = async (stageId: number) => {
  const response = await axiosClient.patch(`/stages/${stageId}/validate/ar`);
  return response.data;
};
