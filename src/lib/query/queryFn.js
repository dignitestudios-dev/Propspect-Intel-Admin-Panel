import axiosinstance from "../../axios";

export const getUsers = async ({
  page = 1,
  itemsPerPage = 10,
  search = "",
  startDate = "",
  endDate = "",
  statusFilter = "All",
}) => {
  const params = new URLSearchParams({
    page,
    limit: itemsPerPage,
    search,
    startDate: startDate || "",
    endDate: endDate || "",
    ...(statusFilter === "Active"
      ? { status: true }
      : statusFilter === "Inactive"
        ? { status: false }
        : {}),
  });

  const res = await axiosinstance.get(`/user?${params.toString()}`);
  return res.data;
};
export const getStatesUsers = async () => {
  const res = await axiosinstance.get(`/user/dashboard/counts`);
  return res.data.data;
};
export const getAthelete = async ({
  page = 1,
  itemsPerPage = 10,
  search,
  active,
  minAge,
  maxAge,
  position,
}) => {
  const res = await axiosinstance.get(
    `/athlete?page=${page}&limit=${itemsPerPage}&search=${search}&active=${active}&minAge=${minAge}&maxAge=${maxAge}&position=${position}`,
  );
  return res.data;
};
export const getAtheleteCount = async () => {
  const res = await axiosinstance.get(`/athlete/counts`);
  return res.data.data;
};
export const getAtheleteById = async (id) => {
  const res = await axiosinstance.get(`/athlete/${id}`);
  return res.data.data;
};
export const getInterestById = async (id) => {
  const res = await axiosinstance.get(`/athlete/${id}/intrests`);
  return res.data.data;
};

export const getNotification = async ({
  page = 1,
  itemsPerPage = 10,
  search,
  activeTab,
}) => {
  const res = await axiosinstance.get(
    `/notification?page=${page}&limit=${itemsPerPage}&search=${search}&type=${activeTab === "Specific Users" ? "Specific" : activeTab}`,
  );
  return res.data;
};

export const getAdminStats = async ({ statsFilter }) => {
  const res = await axiosinstance.get(
    `/dashboard/admin/stats?range=${statsFilter}`,
  );
  return res.data.data;
};
export const getAthleteRequest = async ({
  page = 1,
  itemsPerPage = 10,
  active,
}) => {
  let status = active?.toLowerCase();

  if (status === "contacted") {
    status = "updated";
  }

  const statusQuery = status && status !== "all" ? `&status=${status}` : "";

  const res = await axiosinstance.get(
    `/dashboard/admin/requests?page=${page}&limit=${itemsPerPage}${statusQuery}`,
  );

  return res.data;
};
export const getMostViewAthlete = async ({
  page = 1,
  itemsPerPage = 10,
  popularactive,
}) => {
  const res = await axiosinstance.get(
    `/dashboard/admin/athletes/most-viewed?range=${popularactive}&page=${page}&limit=${itemsPerPage}
 `,
  );

  return res.data;
};

export const getContact = async ({
  search,
  activeTab,
  page = 1,
  itemsPerPage = 10,
}) => {
  let url = `/contact?search=${search}&page=${page}&limit=${itemsPerPage}`;

  if (activeTab !== "All") {
    url += `&emailStatus=${activeTab}`;
  }

  const res = await axiosinstance.get(url);
  return res.data;
};
export const getContactById = async (id) => {
  const res = await axiosinstance.get(`/contact/${id}`);
  return res.data.data;
};
export const getContactStats = async () => {
  const res = await axiosinstance.get(`/contact/stats`);
  return res.data.data;
};
export const getSchool = async ({ page = 1, itemsPerPage = 10 }) => {
  const res = await axiosinstance.get(
    `/school?page=${page}&limit=${itemsPerPage}`,
  );
  return res.data;
};
export const getTopLocation = async () => {
  const res = await axiosinstance.get(`/dashboard/admin/location-stats`);
  return res.data;
};
export const getLoggedUser = async ({
  page = 1,
  itemsPerPage = 10,
  search,
}) => {
  const res = await axiosinstance.get(
    `/dashboard/admin/logged-users?page=${page}&limit=${itemsPerPage}&search=${search}`,
  );
  return res.data;
};
export const getAnalytics = async ({ range }) => {
  const res = await axiosinstance.get(
    `/athlete/analytics/overview?range=${range}`,
  );
  return res.data;
};
export const getFilterDetail = async () => {
  const res = await axiosinstance.get(`/athlete/analytics/details`);
  return res.data;
};
export const getGraphDetail = async () => {
  const res = await axiosinstance.get(`/athlete/analytics/stats`);
  return res.data;
};
export const getUserActivity = async (id, cursorId) => {
  const res = await axiosinstance.get(
    `/user/activity/${id}?cursor=${cursorId}`,
  );
  return res.data;
};

export const getContactCount = async () => {
  const res = await axiosinstance.get(`/contact/counts`);
  return res.data;
};
