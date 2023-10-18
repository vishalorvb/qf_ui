const pagegenerator = (data, name) => {
  console.log(data?.info);
  return (
    <>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <title>{name ?? "report"}</title>
          <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
          />
          <style>
            {`  
          .full-width {
            max-width: 100%;
        }
        .border-line{
          border-right: 1px solid gray;
        }
        .overflow{
          overflow:auto;
        }
        .gray-text{
          color:gray;
        }
        .topnav__logo{
          width:220px;
          height:30px;
          display:block;
          margin-left: 10px;
        }
        .nav-pills .nav-link.active,
.nav-pills .nav-link.show {
  color: #836969 !important;
  background-color: #f1f4f8 !important;
}
.force-wrap{
  word-wrap: break-word;
}
          `}
          </style>
        </head>
        <body>
          <nav class="navbar fixed-top navbar-light bg-light m-20 ">
            <div class="container-fluid topnav__logo">
              <svg
                version="1.1"
                id="Layer_1"
                xmlns="http://www.w3.org/2000/svg"
                xlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                width="254px"
                height="41px"
                viewBox="0 0 254 41"
                enable-background="new 0 0 254 41"
                space="preserve"
              >
                {" "}
                <image
                  id="image0"
                  width="254"
                  height="41"
                  x="0"
                  y="0"
                  href="data:image/png;base64,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"
                />
              </svg>
            </div>
          </nav>
          <div class="container m-0 pt-5 mt-5 ml-2 full-width">
            <div class="row">
              <div class="col-md-5 border-line">
                <ul class="nav flex-column nav-pills w-100">
                  {data?.map((d, id) => {
                    return (
                      <li class="nav-item w-100">
                        <a
                          class={`nav-link force-wrap w-100 ${
                            id === 0 && "active"
                          }`}
                          id={`${d.id}-tab`}
                          data-bs-toggle="tab"
                          href={`#${d.id}`}
                          role="tab"
                          aria-controls={d.id}
                          aria-selected="true"
                        >
                          {{
                            chrome: (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                class="bi bi-browser-chrome"
                                viewBox="0 0 16 16"
                              >
                                <path
                                  fill-rule="evenodd"
                                  d="M16 8a8.001 8.001 0 0 1-7.022 7.94l1.902-7.098a2.995 2.995 0 0 0 .05-1.492A2.977 2.977 0 0 0 10.237 6h5.511A8 8 0 0 1 16 8ZM0 8a8 8 0 0 0 7.927 8l1.426-5.321a2.978 2.978 0 0 1-.723.255 2.979 2.979 0 0 1-1.743-.147 2.986 2.986 0 0 1-1.043-.7L.633 4.876A7.975 7.975 0 0 0 0 8Zm5.004-.167L1.108 3.936A8.003 8.003 0 0 1 15.418 5H8.066a2.979 2.979 0 0 0-1.252.243 2.987 2.987 0 0 0-1.81 2.59ZM8 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"
                                />
                              </svg>
                            ),
                            edge: (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                class="bi bi-browser-edge"
                                viewBox="0 0 16 16"
                              >
                                <path d="M9.482 9.341c-.069.062-.17.153-.17.309 0 .162.107.325.3.456.877.613 2.521.54 2.592.538h.002c.667 0 1.32-.18 1.894-.519A3.838 3.838 0 0 0 16 6.819c.018-1.316-.44-2.218-.666-2.664l-.04-.08C13.963 1.487 11.106 0 8 0A8 8 0 0 0 .473 5.29C1.488 4.048 3.183 3.262 5 3.262c2.83 0 5.01 1.885 5.01 4.797h-.004v.002c0 .338-.168.832-.487 1.244l.006-.006a.594.594 0 0 1-.043.041Z" />
                                <path d="M.01 7.753a8.137 8.137 0 0 0 .753 3.641 8 8 0 0 0 6.495 4.564 5.21 5.21 0 0 1-.785-.377h-.01l-.12-.075a5.45 5.45 0 0 1-1.56-1.463A5.543 5.543 0 0 1 6.81 5.8l.01-.004.025-.012c.208-.098.62-.292 1.167-.285.129.001.257.012.384.033a4.037 4.037 0 0 0-.993-.698l-.01-.005C6.348 4.282 5.199 4.263 5 4.263c-2.44 0-4.824 1.634-4.99 3.49Zm10.263 7.912c.088-.027.177-.054.265-.084-.102.032-.204.06-.307.086l.042-.002Z" />
                                <path d="M10.228 15.667a5.21 5.21 0 0 0 .303-.086l.082-.025a8.019 8.019 0 0 0 4.162-3.3.25.25 0 0 0-.331-.35c-.215.112-.436.21-.663.294a6.367 6.367 0 0 1-2.243.4c-2.957 0-5.532-2.031-5.532-4.644.002-.135.017-.268.046-.399a4.543 4.543 0 0 0-.46 5.898l.003.005c.315.441.707.821 1.158 1.121h.003l.144.09c.877.55 1.721 1.078 3.328.996Z" />
                              </svg>
                            ),
                            firefox: (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                class="bi bi-browser-firefox"
                                viewBox="0 0 16 16"
                              >
                                <path d="M13.384 3.408c.535.276 1.22 1.152 1.556 1.963a7.98 7.98 0 0 1 .503 3.897l-.009.077a8.533 8.533 0 0 1-.026.224A7.758 7.758 0 0 1 .006 8.257v-.04c.016-.363.055-.724.114-1.082.01-.074.075-.42.09-.489l.01-.051a6.551 6.551 0 0 1 1.041-2.35c.217-.31.46-.6.725-.87.233-.238.487-.456.758-.65a1.5 1.5 0 0 1 .26-.137c-.018.268-.04 1.553.268 1.943h.003a5.744 5.744 0 0 1 1.868-1.443 3.597 3.597 0 0 0 .021 1.896c.07.047.137.098.2.152.107.09.226.207.454.433l.068.066.009.009a1.933 1.933 0 0 0 .213.18c.383.287.943.563 1.306.741.201.1.342.168.359.193l.004.008c-.012.193-.695.858-.933.858-2.206 0-2.564 1.335-2.564 1.335.087.997.714 1.839 1.517 2.357a3.72 3.72 0 0 0 .439.241c.076.034.152.065.228.094.325.115.665.18 1.01.194 3.043.143 4.155-2.804 3.129-4.745v-.001a3.005 3.005 0 0 0-.731-.9 2.945 2.945 0 0 0-.571-.37l-.003-.002a2.679 2.679 0 0 1 1.87.454 3.915 3.915 0 0 0-3.396-1.983c-.078 0-.153.005-.23.01l-.042.003V4.31h-.002a3.882 3.882 0 0 0-.8.14 6.454 6.454 0 0 0-.333-.314 2.321 2.321 0 0 0-.2-.152 3.594 3.594 0 0 1-.088-.383 4.88 4.88 0 0 1 1.352-.289l.05-.003c.052-.004.125-.01.205-.012C7.996 2.212 8.733.843 10.17.002l-.003.005.003-.001.002-.002h.002l.002-.002a.028.028 0 0 1 .015 0 .02.02 0 0 1 .012.007 2.408 2.408 0 0 0 .206.48c.06.103.122.2.183.297.49.774 1.023 1.379 1.543 1.968.771.874 1.512 1.715 2.036 3.02l-.001-.013a8.06 8.06 0 0 0-.786-2.353Z" />
                              </svg>
                            ),
                            safari: (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                class="bi bi-browser-safari"
                                viewBox="0 0 16 16"
                              >
                                <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16Zm.25-14.75v1.5a.25.25 0 0 1-.5 0v-1.5a.25.25 0 0 1 .5 0Zm0 12v1.5a.25.25 0 1 1-.5 0v-1.5a.25.25 0 1 1 .5 0ZM4.5 1.938a.25.25 0 0 1 .342.091l.75 1.3a.25.25 0 0 1-.434.25l-.75-1.3a.25.25 0 0 1 .092-.341Zm6 10.392a.25.25 0 0 1 .341.092l.75 1.299a.25.25 0 1 1-.432.25l-.75-1.3a.25.25 0 0 1 .091-.34ZM2.28 4.408l1.298.75a.25.25 0 0 1-.25.434l-1.299-.75a.25.25 0 0 1 .25-.434Zm10.392 6 1.299.75a.25.25 0 1 1-.25.434l-1.3-.75a.25.25 0 0 1 .25-.434ZM1 8a.25.25 0 0 1 .25-.25h1.5a.25.25 0 0 1 0 .5h-1.5A.25.25 0 0 1 1 8Zm12 0a.25.25 0 0 1 .25-.25h1.5a.25.25 0 1 1 0 .5h-1.5A.25.25 0 0 1 13 8ZM2.03 11.159l1.298-.75a.25.25 0 0 1 .25.432l-1.299.75a.25.25 0 0 1-.25-.432Zm10.392-6 1.299-.75a.25.25 0 1 1 .25.433l-1.3.75a.25.25 0 0 1-.25-.434ZM4.5 14.061a.25.25 0 0 1-.092-.341l.75-1.3a.25.25 0 0 1 .434.25l-.75 1.3a.25.25 0 0 1-.342.091Zm6-10.392a.25.25 0 0 1-.091-.342l.75-1.299a.25.25 0 1 1 .432.25l-.75 1.3a.25.25 0 0 1-.341.09ZM6.494 1.415l.13.483a.25.25 0 1 1-.483.13l-.13-.483a.25.25 0 0 1 .483-.13ZM9.86 13.972l.13.483a.25.25 0 1 1-.483.13l-.13-.483a.25.25 0 0 1 .483-.13ZM3.05 3.05a.25.25 0 0 1 .354 0l.353.354a.25.25 0 0 1-.353.353l-.354-.353a.25.25 0 0 1 0-.354Zm9.193 9.193a.25.25 0 0 1 .353 0l.354.353a.25.25 0 1 1-.354.354l-.353-.354a.25.25 0 0 1 0-.353ZM1.545 6.01l.483.13a.25.25 0 1 1-.13.483l-.483-.13a.25.25 0 1 1 .13-.482Zm12.557 3.365.483.13a.25.25 0 1 1-.13.483l-.483-.13a.25.25 0 1 1 .13-.483Zm-12.863.436a.25.25 0 0 1 .176-.306l.483-.13a.25.25 0 1 1 .13.483l-.483.13a.25.25 0 0 1-.306-.177Zm12.557-3.365a.25.25 0 0 1 .176-.306l.483-.13a.25.25 0 1 1 .13.483l-.483.13a.25.25 0 0 1-.306-.177ZM3.045 12.944a.299.299 0 0 1-.029-.376l3.898-5.592a.25.25 0 0 1 .062-.062l5.602-3.884a.278.278 0 0 1 .392.392L9.086 9.024a.25.25 0 0 1-.062.062l-5.592 3.898a.299.299 0 0 1-.382-.034l-.005-.006Zm3.143 1.817a.25.25 0 0 1-.176-.306l.129-.483a.25.25 0 0 1 .483.13l-.13.483a.25.25 0 0 1-.306.176ZM9.553 2.204a.25.25 0 0 1-.177-.306l.13-.483a.25.25 0 1 1 .483.13l-.13.483a.25.25 0 0 1-.306.176Z" />
                              </svg>
                            ),
                            ios: (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                class="bi bi-apple"
                                viewBox="0 0 16 16"
                              >
                                <path d="M11.182.008C11.148-.03 9.923.023 8.857 1.18c-1.066 1.156-.902 2.482-.878 2.516.024.034 1.52.087 2.475-1.258.955-1.345.762-2.391.728-2.43Zm3.314 11.733c-.048-.096-2.325-1.234-2.113-3.422.212-2.189 1.675-2.789 1.698-2.854.023-.065-.597-.79-1.254-1.157a3.692 3.692 0 0 0-1.563-.434c-.108-.003-.483-.095-1.254.116-.508.139-1.653.589-1.968.607-.316.018-1.256-.522-2.267-.665-.647-.125-1.333.131-1.824.328-.49.196-1.422.754-2.074 2.237-.652 1.482-.311 3.83-.067 4.56.244.729.625 1.924 1.273 2.796.576.984 1.34 1.667 1.659 1.899.319.232 1.219.386 1.843.067.502-.308 1.408-.485 1.766-.472.357.013 1.061.154 1.782.539.571.197 1.111.115 1.652-.105.541-.221 1.324-1.059 2.238-2.758.347-.79.505-1.217.473-1.282Z" />
                                <path d="M11.182.008C11.148-.03 9.923.023 8.857 1.18c-1.066 1.156-.902 2.482-.878 2.516.024.034 1.52.087 2.475-1.258.955-1.345.762-2.391.728-2.43Zm3.314 11.733c-.048-.096-2.325-1.234-2.113-3.422.212-2.189 1.675-2.789 1.698-2.854.023-.065-.597-.79-1.254-1.157a3.692 3.692 0 0 0-1.563-.434c-.108-.003-.483-.095-1.254.116-.508.139-1.653.589-1.968.607-.316.018-1.256-.522-2.267-.665-.647-.125-1.333.131-1.824.328-.49.196-1.422.754-2.074 2.237-.652 1.482-.311 3.83-.067 4.56.244.729.625 1.924 1.273 2.796.576.984 1.34 1.667 1.659 1.899.319.232 1.219.386 1.843.067.502-.308 1.408-.485 1.766-.472.357.013 1.061.154 1.782.539.571.197 1.111.115 1.652-.105.541-.221 1.324-1.059 2.238-2.758.347-.79.505-1.217.473-1.282Z" />
                              </svg>
                            ),
                            mobile: (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                class="bi bi-phone"
                                viewBox="0 0 16 16"
                              >
                                <path d="M11 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h6zM5 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H5z" />
                                <path d="M8 14a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
                              </svg>
                            ),
                            api: (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 23.517 23.516"
                              >
                                <path
                                  id="api"
                                  d="M9.964,23.517,9.438,21.4,6.58,20.22,4.714,21.341,2.176,18.8,3.3,16.938,2.113,14.08,0,13.553V9.965l2.113-.526L3.3,6.581,2.176,4.715,4.714,2.177,6.58,3.3,9.438,2.114,9.964,0h3.588l.527,2.113L16.937,3.3,18.8,2.177,21.34,4.715,20.219,6.581,21.4,9.439l2.113.526v3.588L21.4,14.08l-1.184,2.858L21.34,18.8,18.8,21.341,16.937,20.22,14.079,21.4l-.527,2.113ZM4.532,11.759a7.227,7.227,0,1,0,7.227-7.227A7.235,7.235,0,0,0,4.532,11.759Zm2.045,2.4a.612.612,0,0,1-.321-.8L7.827,9.694a.613.613,0,0,1,1.126,0l1.572,3.663a.612.612,0,0,1-.321.8.6.6,0,0,1-.241.05A.612.612,0,0,1,9.4,13.84L8.39,11.489,7.381,13.84a.612.612,0,0,1-.8.321Zm8.836-.656V9.936a.612.612,0,1,1,1.225,0v3.569a.612.612,0,0,1-1.225,0Zm-4.232,0V9.936a.612.612,0,0,1,.612-.612h1.262A1.551,1.551,0,0,1,14.6,10.872v.183A1.551,1.551,0,0,1,13.055,12.6h-.649v.9a.612.612,0,0,1-1.225,0Zm1.225-2.348v.223h.649a.325.325,0,0,0,.324-.324v-.183a.325.325,0,0,0-.324-.324h-.649Z"
                                  fill="#97a0b4"
                                />
                              </svg>
                            ),
                          }[d.browser_type] ?? (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="15.001"
                              height="15.002"
                              viewBox="0 0 15.001 15.002"
                            >
                              <path
                                id="na"
                                d="M63,1079.5a7.5,7.5,0,1,1,7.5,7.5A7.5,7.5,0,0,1,63,1079.5Zm3.14,4.361a6.168,6.168,0,1,0-1.806-4.361A6.167,6.167,0,0,0,66.14,1083.862Zm3.494-1.123V1079.3a.867.867,0,0,1,1.733,0v3.434a.867.867,0,0,1-1.733,0Zm-.175-6.288a1.042,1.042,0,1,1,1.041,1.042A1.041,1.041,0,0,1,69.459,1076.45Z"
                                transform="translate(-63 -1072)"
                                fill="#788194"
                              />
                            </svg>
                          )}{" "}
                          {d.testcase_name}{" "}
                          {{
                            pass: (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="18"
                                viewBox="0 0 18 18"
                              >
                                <g
                                  id="success"
                                  transform="translate(-363.5 -531)"
                                >
                                  <g
                                    id="Group_278"
                                    data-name="Group 278"
                                    transform="translate(367.824 539.512)"
                                  >
                                    <g
                                      id="Group_277"
                                      data-name="Group 277"
                                      transform="translate(0 0)"
                                    >
                                      <path
                                        id="Path_507"
                                        data-name="Path 507"
                                        d="M25.3,79.719a.059.059,0,0,1-.084,0l-1.56-1.559-1.066,1.067,1.559,1.56L25.261,81.9l4.27-4.27-1.067-1.066Z"
                                        transform="translate(-22.593 -76.559)"
                                        fill="#7db545"
                                      />
                                    </g>
                                  </g>
                                  <g
                                    id="Group_280"
                                    data-name="Group 280"
                                    transform="translate(361 528.5)"
                                  >
                                    <path
                                      id="Path_515"
                                      data-name="Path 515"
                                      d="M5.74,2.5V5.74H2.5V20.5H17.26V17.26H20.5V2.5ZM15.858,19.1H3.9V7.142H15.858Zm3.24-3.24H17.279V5.74H7.142V3.9H19.1Z"
                                      fill="#7db545"
                                    />
                                  </g>
                                </g>
                              </svg>
                            ),
                            fail: (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="18"
                                height="18"
                                viewBox="0 0 18 18"
                              >
                                <g id="fail" transform="translate(-339.5 -531)">
                                  <g
                                    id="Group_279"
                                    data-name="Group 279"
                                    transform="translate(337 528.5)"
                                  >
                                    <path
                                      id="Path_515"
                                      data-name="Path 515"
                                      d="M5.74,2.5V5.74H2.5V20.5H17.26V17.26H20.5V2.5ZM15.858,19.1H3.9V7.142H15.858Zm3.24-3.24H17.279V5.74H7.142V3.9H19.1Z"
                                      fill="#d64545"
                                    />
                                    <path
                                      id="Path_516"
                                      data-name="Path 516"
                                      d="M25.314,47.638l.625.625a.412.412,0,0,0,.568,0l1.781-1.781,1.781,1.781a.412.412,0,0,0,.568,0l.625-.625a.412.412,0,0,0,0-.568l-1.781-1.781,1.781-1.781a.412.412,0,0,0,0-.568l-.625-.625a.412.412,0,0,0-.568,0l-1.781,1.781-1.781-1.781a.412.412,0,0,0-.568,0l-.625.625a.412.412,0,0,0,0,.568l1.781,1.781-1.781,1.781A.412.412,0,0,0,25.314,47.638Z"
                                      transform="translate(-18.399 -32.178)"
                                      fill="#d64545"
                                    />
                                  </g>
                                </g>
                              </svg>
                            ),
                          }[d.status] ?? (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                            >
                              <g id="report-check" transform="translate(0 0)">
                                <path
                                  id="Subtraction_14"
                                  data-name="Subtraction 14"
                                  d="M8,16a8,8,0,1,1,8-8A8.009,8.009,0,0,1,8,16ZM5.333,7.38a.62.62,0,0,0-.439,1.058L6.91,10.454a.62.62,0,0,0,.877,0l4.03-4.031a.62.62,0,0,0-.876-.877L7.348,9.138,5.772,7.562A.617.617,0,0,0,5.333,7.38Z"
                                  transform="translate(0 0)"
                                  fill="#66bb6a"
                                />
                              </g>
                            </svg>
                          )}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div class="col-md-7">
                <div class="tab-content">
                  {data?.map((d, id) => {
                    return (
                      <div
                        class={`tab-pane fade show ${id === 0 && "active"}`}
                        id={d.id}
                        role="tabpanel"
                        aria-labelledby={`${d.id}-tab`}
                      >
                        <h3 class="gray-text">{d.testcase_name}</h3>
                        <hr />
                        <div class="container-fluid ">
                          <div class="row">
                            <div class="col-3">
                              <p>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  fill="currentColor"
                                  class="bi bi-hourglass-top"
                                  viewBox="0 0 16 16"
                                >
                                  <path d="M2 14.5a.5.5 0 0 0 .5.5h11a.5.5 0 1 0 0-1h-1v-1a4.5 4.5 0 0 0-2.557-4.06c-.29-.139-.443-.377-.443-.59v-.7c0-.213.154-.451.443-.59A4.5 4.5 0 0 0 12.5 3V2h1a.5.5 0 0 0 0-1h-11a.5.5 0 0 0 0 1h1v1a4.5 4.5 0 0 0 2.557 4.06c.29.139.443.377.443.59v.7c0 .213-.154.451-.443.59A4.5 4.5 0 0 0 3.5 13v1h-1a.5.5 0 0 0-.5.5zm2.5-.5v-1a3.5 3.5 0 0 1 1.989-3.158c.533-.256 1.011-.79 1.011-1.491v-.702s.18.101.5.101.5-.1.5-.1v.7c0 .701.478 1.236 1.011 1.492A3.5 3.5 0 0 1 11.5 13v1h-7z" />
                                </svg>{" "}
                                START TIME
                              </p>
                              <strong class="text-success">
                                {d.start_time_st}
                              </strong>
                            </div>
                            <div class="col-3">
                              <p>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  fill="currentColor"
                                  class="bi bi-hourglass-bottom text-danger"
                                  viewBox="0 0 16 16"
                                >
                                  <path d="M2 1.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-1v1a4.5 4.5 0 0 1-2.557 4.06c-.29.139-.443.377-.443.59v.7c0 .213.154.451.443.59A4.5 4.5 0 0 1 12.5 13v1h1a.5.5 0 0 1 0 1h-11a.5.5 0 1 1 0-1h1v-1a4.5 4.5 0 0 1 2.557-4.06c.29-.139.443-.377.443-.59v-.7c0-.213-.154-.451-.443-.59A4.5 4.5 0 0 1 3.5 3V2h-1a.5.5 0 0 1-.5-.5zm2.5.5v1a3.5 3.5 0 0 0 1.989 3.158c.533.256 1.011.791 1.011 1.491v.702s.18.149.5.149.5-.15.5-.15v-.7c0-.701.478-1.236 1.011-1.492A3.5 3.5 0 0 0 11.5 3V2h-7z" />
                                </svg>{" "}
                                END TIME
                              </p>
                              <strong class="text-danger">
                                {d.end_time_st}
                              </strong>
                            </div>
                            <div class="col-3">
                              <p>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  fill="currentColor"
                                  class="bi bi-gear-fill"
                                  viewBox="0 0 16 16"
                                >
                                  <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z" />
                                </svg>{" "}
                                EXECUTION TIME
                              </p>
                              <strong>{d.execution_time_st}</strong>
                            </div>
                          </div>
                        </div>
                        <hr />
                        <div>
                          {d.datasetdata.map((reportDetails) => {
                            const reportText = reportDetails.text;
                            const resultType = reportDetails.result_type;
                            let detailsIcon;
                            if (reportText.includes("Password")) {
                              detailsIcon = (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="19.5"
                                  height="16.731"
                                  viewBox="0 0 19.5 16.731"
                                >
                                  <path
                                    id="password"
                                    d="M19.367,41.883a18.49,18.49,0,0,0-4.212-4.011L17.9,35.124a.7.7,0,0,0-.968-1l-.017.017-3,3A9.006,9.006,0,0,0,9.75,36.024c-5.293,0-9.443,5.619-9.617,5.858a.7.7,0,0,0,0,.819,18.49,18.49,0,0,0,4.212,4.011L1.6,49.46a.7.7,0,1,0,.968,1l.017-.017,3-3A9.006,9.006,0,0,0,9.75,48.56c5.293,0,9.443-5.619,9.617-5.858A.7.7,0,0,0,19.367,41.883ZM5.358,45.7a17.341,17.341,0,0,1-3.774-3.41c1.025-1.242,4.35-4.875,8.166-4.875a7.372,7.372,0,0,1,3.126.766l-1.209,1.209a3.477,3.477,0,0,0-4.819,4.819Zm6.273-4.3a2.055,2.055,0,0,1,.209.895A2.089,2.089,0,0,1,9.75,44.381a2.055,2.055,0,0,1-.895-.209ZM7.87,43.187a2.055,2.055,0,0,1-.209-.895A2.089,2.089,0,0,1,9.75,40.2a2.055,2.055,0,0,1,.895.209Zm1.88,3.98A7.372,7.372,0,0,1,6.624,46.4l1.209-1.209a3.477,3.477,0,0,0,4.819-4.819l1.49-1.49a17.342,17.342,0,0,1,3.774,3.41C16.891,43.534,13.567,47.167,9.75,47.167Z"
                                    transform="translate(0 -33.926)"
                                    fill="#788194"
                                  />
                                </svg>
                              );
                            } else if (reportText.includes("Entered")) {
                              detailsIcon = (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="19.509"
                                  height="12.582"
                                  viewBox="0 0 19.509 12.582"
                                >
                                  <path
                                    id="keyboard"
                                    d="M64.158,1084.582A1.16,1.16,0,0,1,63,1083.423v-10.265A1.146,1.146,0,0,1,64.158,1072H81.351a1.16,1.16,0,0,1,1.158,1.158v10.265a1.16,1.16,0,0,1-1.158,1.159Zm.232-1.391H81.119v-9.8H64.391Zm4.749-1.436v-1.391h7.23v1.391ZM77,1079.09V1077.7h2.711v1.391Zm-3.73,0V1077.7h2.711v1.391Zm-3.73,0V1077.7h2.711v1.391Zm-3.73,0V1077.7h2.711v1.391ZM77,1076.171v-1.39h2.711v1.39Zm-3.73,0v-1.39h2.711v1.39Zm-3.73,0v-1.39h2.711v1.39Zm-3.73,0v-1.39h2.711v1.39Z"
                                    transform="translate(-63 -1072)"
                                    fill="#788194"
                                  />
                                </svg>
                              );
                            } else if (reportText.includes("Clicked")) {
                              detailsIcon = (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="12.576"
                                  height="17.616"
                                  viewBox="0 0 12.576 17.616"
                                >
                                  <path
                                    id="click"
                                    d="M68.794,1089.616a2.59,2.59,0,0,1-1.883-.815l-3.484-3.716a1.547,1.547,0,0,1,.084-2.217,1.57,1.57,0,0,1,2.173.1l.606.635v-7.951a1.549,1.549,0,0,1,1.595-1.547,1.571,1.571,0,0,1,1.509,1.569v3.161a1.547,1.547,0,0,1,1.886.762,1.547,1.547,0,0,1,2.065.688,1.549,1.549,0,0,1,2.232,1.388v5.368a2.583,2.583,0,0,1-2.58,2.58Zm-4.591-5.982a.516.516,0,0,0-.028.74l3.489,3.721a1.554,1.554,0,0,0,1.13.489H73a1.55,1.55,0,0,0,1.549-1.548v-5.368a.516.516,0,0,0-1.032,0v.173a.516.516,0,0,1-1.032,0v-.86a.516.516,0,1,0-1.032,0v.86a.516.516,0,0,1-1.032,0v-1.549a.516.516,0,0,0-1.022-.1v1.647a.521.521,0,0,1-1.042,0c0-3.067.01-.493.01-6.172a.533.533,0,0,0-.5-.537.518.518,0,0,0-.535.516v9.239a.517.517,0,0,1-.889.356l-1.5-1.566a.547.547,0,0,0-.4-.17A.5.5,0,0,0,64.2,1083.633Zm.073-7.382a3.63,3.63,0,1,1,7.155-.009.516.516,0,0,1-1.018-.174,2.6,2.6,0,1,0-5.12.006.516.516,0,1,1-1.017.177Z"
                                    transform="translate(-63 -1072)"
                                    fill="#788194"
                                  />
                                </svg>
                              );
                            } else if (resultType.includes("pass")) {
                              detailsIcon = (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="18"
                                  height="18"
                                  viewBox="0 0 18 18"
                                >
                                  <g
                                    id="success"
                                    transform="translate(-363.5 -531)"
                                  >
                                    <g
                                      id="Group_278"
                                      data-name="Group 278"
                                      transform="translate(367.824 539.512)"
                                    >
                                      <g
                                        id="Group_277"
                                        data-name="Group 277"
                                        transform="translate(0 0)"
                                      >
                                        <path
                                          id="Path_507"
                                          data-name="Path 507"
                                          d="M25.3,79.719a.059.059,0,0,1-.084,0l-1.56-1.559-1.066,1.067,1.559,1.56L25.261,81.9l4.27-4.27-1.067-1.066Z"
                                          transform="translate(-22.593 -76.559)"
                                          fill="#7db545"
                                        />
                                      </g>
                                    </g>
                                    <g
                                      id="Group_280"
                                      data-name="Group 280"
                                      transform="translate(361 528.5)"
                                    >
                                      <path
                                        id="Path_515"
                                        data-name="Path 515"
                                        d="M5.74,2.5V5.74H2.5V20.5H17.26V17.26H20.5V2.5ZM15.858,19.1H3.9V7.142H15.858Zm3.24-3.24H17.279V5.74H7.142V3.9H19.1Z"
                                        fill="#7db545"
                                      />
                                    </g>
                                  </g>
                                </svg>
                              );
                            } else if (resultType.includes("fail")) {
                              detailsIcon = (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="18"
                                  height="18"
                                  viewBox="0 0 18 18"
                                >
                                  <g
                                    id="fail"
                                    transform="translate(-339.5 -531)"
                                  >
                                    <g
                                      id="Group_279"
                                      data-name="Group 279"
                                      transform="translate(337 528.5)"
                                    >
                                      <path
                                        id="Path_515"
                                        data-name="Path 515"
                                        d="M5.74,2.5V5.74H2.5V20.5H17.26V17.26H20.5V2.5ZM15.858,19.1H3.9V7.142H15.858Zm3.24-3.24H17.279V5.74H7.142V3.9H19.1Z"
                                        fill="#d64545"
                                      />
                                      <path
                                        id="Path_516"
                                        data-name="Path 516"
                                        d="M25.314,47.638l.625.625a.412.412,0,0,0,.568,0l1.781-1.781,1.781,1.781a.412.412,0,0,0,.568,0l.625-.625a.412.412,0,0,0,0-.568l-1.781-1.781,1.781-1.781a.412.412,0,0,0,0-.568l-.625-.625a.412.412,0,0,0-.568,0l-1.781,1.781-1.781-1.781a.412.412,0,0,0-.568,0l-.625.625a.412.412,0,0,0,0,.568l1.781,1.781-1.781,1.781A.412.412,0,0,0,25.314,47.638Z"
                                        transform="translate(-18.399 -32.178)"
                                        fill="#d64545"
                                      />
                                    </g>
                                  </g>
                                </svg>
                              );
                            } else {
                              detailsIcon = (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="15.001"
                                  height="15.002"
                                  viewBox="0 0 15.001 15.002"
                                >
                                  <path
                                    id="na"
                                    d="M63,1079.5a7.5,7.5,0,1,1,7.5,7.5A7.5,7.5,0,0,1,63,1079.5Zm3.14,4.361a6.168,6.168,0,1,0-1.806-4.361A6.167,6.167,0,0,0,66.14,1083.862Zm3.494-1.123V1079.3a.867.867,0,0,1,1.733,0v3.434a.867.867,0,0,1-1.733,0Zm-.175-6.288a1.042,1.042,0,1,1,1.041,1.042A1.041,1.041,0,0,1,69.459,1076.45Z"
                                    transform="translate(-63 -1072)"
                                    fill="#788194"
                                  />
                                </svg>
                              );
                            }
                            return (
                              <>
                                <p>
                                  {reportDetails.result_type !== "screen" &&
                                    detailsIcon}{" "}
                                  {reportDetails?.text}
                                </p>
                                {reportDetails?.screenshot && (
                                  <img
                                    src={`data:image/png;base64,${reportDetails?.screenshot}`}
                                    width={"250px"}
                                  />
                                )}
                                <hr />
                              </>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
        </body>
      </html>
    </>
  );
};

export default pagegenerator;
