"use client";

import axios from "axios";
import { differenceInCalendarDays, eachDayOfInterval } from "date-fns";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Range } from "react-date-range";
import { toast } from "react-hot-toast";

import useLoginModal from "../hooks/useLoginModal";

import { SafeListing, SafeReservation, SafeUser } from "../types";
import { categories } from "../utils/categories";

import Container from "../components/Container";
import ListingHead from "../components/listings/ListingHead";
import ListingReservation from "../components/listings/ListingReservation";
import Listinginfo from "../components/listings/Listinginfo";

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};

interface ListingClientProps {
  reservations?: SafeReservation[];
  listing: SafeListing & {
    user: SafeUser;
  };
  currentUser?: SafeUser | null;
}
const ListingClient: React.FC<ListingClientProps> = ({
  listing,
  currentUser,
  reservations = [],
}) => {
  // hooks
  const loginModal = useLoginModal();
  const router = useRouter();

  // states
  const [isLoading, setIsLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(listing.price);
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      // count the difference of days
      const dayDiff =
        differenceInCalendarDays(dateRange.endDate, dateRange.startDate) + 1;

      if (dayDiff && listing.price) {
        setTotalPrice(dayDiff * listing.price);
      } else {
        setTotalPrice(listing.price);
      }
    }
  }, [dateRange, listing.price]);

  // get disabled dates if there is any reservation on the day
  const disabledDates = useMemo(() => {
    let dates: Date[] = [];

    reservations.forEach((reservation: any) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate),
      });

      dates = [...dates, ...range];
    });
    return dates;
  }, [reservations]);

  // get category object information from categories
  const category = useMemo(() => {
    return categories.find((el) => el.label === listing.category);
  }, [listing.category]);

  // handlers

  // creating new reservation
  const onCreateReservation = useCallback(() => {
    if (!currentUser) return loginModal.onOpen();

    setIsLoading(true);

    axios
      .post("/api/reservations", {
        totalPrice,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        listingId: listing?.id,
      })
      .then(() => {
        toast.success(`Reservation confirmed`);

        setDateRange(initialDateRange);

        // redirect to trips after successfully creating reservation
        router.push("/trips");
      })
      .catch((err) => {
        toast.error("Something went wrong!");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [currentUser, loginModal, listing?.id, dateRange, totalPrice, router]);

  return (
    <Container>
      <div className="max-w-screen-lg mx-auto">
        <div className="flex flex-col gap-6">
          <ListingHead
            title={listing.title}
            imageSrc={listing.imageSrc}
            locationValue={listing.locationValue}
            id={listing.id}
            currentUser={currentUser}
          />
          <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
            <Listinginfo info={listing} category={category} />
            <div className="order-first mb-10 md:order-last md:col-span-3">
              <ListingReservation
                price={listing.price}
                totalPrice={totalPrice}
                dateRange={dateRange}
                onChangeDate={(value) => setDateRange(value)}
                onSubmit={onCreateReservation}
                disabled={isLoading}
                disabledDates={disabledDates}
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ListingClient;
