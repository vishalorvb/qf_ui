import MuiltiSelect from "../../../CustomComponent/MuiltiSelect";

function MapScreen({ pages, setpages }) {
  return (
    <div>
      {pages?.map((page) => {
        return (
          <div>
            {page.name}
            <MuiltiSelect
              options={page.screens_list}
              id={"screen_id"}
              value={"name"}
              stateList={(list) => {
                let p = [...pages];
                p.forEach((pages) => {
                  if (pages.web_page_id === page.web_page_id) {
                    pages.screens_list.forEach((screens) => {
                      if (
                        list.find(
                          (selectedPages) =>
                            selectedPages.screen_id === screens.screen_id
                        )
                      ) {
                        screens.is_select = true;
                      } else {
                        screens.is_select = false;
                      }
                    });
                  }
                });
                setpages([...p]);
              }}
              preselect={page?.screens_list?.filter(
                (screen) => screen.is_select
              )}
            ></MuiltiSelect>
          </div>
        );
      })}
    </div>
  );
}

export default MapScreen;
