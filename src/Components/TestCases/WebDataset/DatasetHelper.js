
export function getScreenList(data) {
    let screenList = []
    data?.screens_in_testcase?.forEach(screens => {
        screenList.push(screens.screen)
    });
    return screenList
}

