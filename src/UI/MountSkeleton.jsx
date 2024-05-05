import React from "react";

function MountSkeleton({index}) {
  return (
    <>
      <div key={index} className="skeleton-mounts__card">
        <div className="skeleton-mounts__img--wrapper"></div>
        <div className="skeleton-mounts__content--wrapper">
          <div className="skeleton-mounts__content">
            <div className="skeleton-mounts__title"></div>
            <div className="skeleton-mounts__source--wrapper">
              <div className="skeleton-mounts__source"></div>
            </div>
            <div className="skeleton-mounts__tags">
              <div className="skeleton-mounts__patch"></div>
              <div className="skeleton-mounts__owners"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MountSkeleton;
