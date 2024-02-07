/* eslint-disable @next/next/no-img-element */
import styles from "./index.module.scss";

interface IProps {
  listing: any[];
}

export default function UserListingDisplayItems({ listing }: IProps) {
  return (
    <div className={styles.containerListing}>
      {listing ? (
        listing.map((item: any, index: any) => {
          return (
            <div className={styles.listingItem} key={index}>
              <img
                src={item.urlImg}
                alt="imagem de um item"
                className={styles.listingItemImg}
              />
            </div>
          );
        })
      ) : (
        <></>
      )}
    </div>
  );
}
