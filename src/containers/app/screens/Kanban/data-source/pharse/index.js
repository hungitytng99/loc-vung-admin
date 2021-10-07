// Data Flow: Step 2
// transform data to fit with UI;
export const mainCategoryService = {
    detailSubCategoryAsync: function (subCategoryId) {
        return apiDetailSubCategory(subCategoryId).then((response) => {
            response.data = {
                id: response.data?.id,
                name: response.data?.name,
                href: '/category/' + String(response.data?.main_category_id) + String(response.data?.id),
            };
            return response;
        });
    },
};
