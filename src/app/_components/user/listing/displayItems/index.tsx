/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
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
              <Link href={`/home/item/${item.id}`}>
                <img
                  src={item.urlImg}
                  alt="imagem de um item"
                  className={styles.listingItemImg}
                />
              </Link>
            </div>
          );
        })
      ) : (
        <></>
      )}
    </div>
  );
}
