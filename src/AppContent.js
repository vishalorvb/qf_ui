import React, { Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
// routes config
import routes from './routes'

const AppContent = () => {
  return (
    
      <Suspense fallback={<ChevronRightIcon color="primary" />}>
        <Routes>
          {routes.map((route, idx) => {
            return (
              route.element && (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  element={<route.element />}
                />
              )
            )
          })}
          <Route path="/" element={<Navigate to="md/project" replace />} />
        </Routes>
      </Suspense>
  )
}

export default React.memo(AppContent)
