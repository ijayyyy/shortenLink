import { makeAutoObservable } from "mobx";
import { UrlPayloadType, UrlType } from "../types";
import {
  createUrl,
  deleteUrlByUrlCode,
  getUrlsForUser,
} from "../Services/urlServices";
import snackBarStore from "../components/snackbar/store/snackBarStore";

class UrlStore {
  urlData: Array<UrlType> = [];
  urlDataLoading: boolean = false;
  showUrlAddView: boolean = false;
  barcodeData: string | null = null;
  newUrlPayload: UrlPayloadType = {
    originalLink: "",
    name: "",
    customUrlCode: "",
  };

  constructor() {
    makeAutoObservable(this);
  }

  init = () => {
    this.fetchUrlsForUser();
  };

  fetchUrlsForUser = async () => {
    try {
      this.urlDataLoading = true;
      const data = await getUrlsForUser();
      if (data && Array.isArray(data)) {
        this.setUrlData(data);
      } else {
        this.setUrlData([]);
        getUrlsForUser();
      }
    } catch (error) {
      console.log(error);
    } finally {
      this.urlDataLoading = false;
    }
  };

  createNewUrl = async () => {
    try {
      if (!this.newUrlPayload.originalLink) {
        alert("url link is required");
        return;
      }

      await createUrl(this.newUrlPayload);
      this.fetchUrlsForUser();
      this.showUrlAddView = false;
    } catch (error) {
      console.error(error);
    }
  };

  deleteUrl = async (urlCode: string) => {
    await deleteUrlByUrlCode(urlCode);
    this.fetchUrlsForUser();
    snackBarStore.showSnackBar("Deleted Successfully", "success");
  };

  setUrlData = (data: Array<UrlType>) => (this.urlData = data.slice());

  setShowUrlAddView = (val: boolean) => (this.showUrlAddView = val);
}

const urlStore = new UrlStore();
export default urlStore;
