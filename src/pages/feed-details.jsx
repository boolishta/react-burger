import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AppHeader } from '../components/app-header/app-header';
import Modal from '../components/modal/modal';
import OrderInfo from '../components/order-info/order-info';

export default function FeedDetailsPage() {
  const location = useLocation();
  const [isModal, setIsModal] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (location.state?.isModal) {
      setIsModal(true);
    }
  }, [location]);
  const modal = () => (
    <Modal handleCloseModal={handleCloseIngredientModal}>
      <OrderInfo />
    </Modal>
  );
  const handleCloseIngredientModal = () => {
    setIsModal(false);
    navigate(-1);
  };
  return (
    <>
      <AppHeader />
      <main className={'mt-30 mb-30'}>
        <section>{isModal ? modal() : <OrderInfo />}</section>
      </main>
    </>
  );
}
