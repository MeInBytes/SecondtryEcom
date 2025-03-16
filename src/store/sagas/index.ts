import { all, call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { Product } from '../../types';
import {
  fetchProductsStart,
  fetchProductsSuccess,
  fetchProductsFailure,
} from '../reducers/productsSlice';

function* fetchProductsSaga() {
  try {
    const response = yield call(axios.get, 'https://fakestoreapi.com/products');
    yield put(fetchProductsSuccess(response.data));
  } catch (error) {
    yield put(fetchProductsFailure(error.message));
  }
}

export default function* rootSaga() {
  yield all([
    takeLatest(fetchProductsStart.type, fetchProductsSaga),
  ]);
}