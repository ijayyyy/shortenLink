import React from "react";
import moment from "moment";
import Modal from "react-modal";
import { observer } from "mobx-react";

import "../../App.css";
import UrlTable from "../Table/UrlTable";
import Button from "../Button";
import TextInput from "../TextInput";
import urlStore from "../../store/urlStore";
import { updateAndEditUrlCode } from "../../Services/urlServices";

import { UrlType } from "../../types";
import snackBarStore from "../snackbar/store/snackBarStore";

import magicwand from "../../images/magicwand.png";

const Dashboard = observer(() => {
  const [editUrlData, setEditUrlData] = React.useState<Partial<UrlType>>();
  const [isEditDialogOpen, setIsEditDialogOpen] = React.useState(false);

  const {
    urlData,
    urlDataLoading,
    newUrlPayload,
    init,
    createNewUrl,
    showUrlAddView,
    setShowUrlAddView,
  } = urlStore;

  React.useEffect(() => {
    init();
  }, [init]);

  const renderEmptyState = () => {
    return (
      <div>
        <div className="dashboard_empty-state">
          <p>You do not have any shortened url</p>
        </div>
        <Button
          onClick={() => setShowUrlAddView(true)}
          label="Create a new short url"
          variant="outlined-primary"
        />
      </div>
    );
  };

  const renderAddNewButton = () => {
    if (showUrlAddView) return;
    return (
      <div className="dashboard__addNew">
        <Button
          onClick={() => setShowUrlAddView(true)}
          label="Create a new short url"
          variant="primary"
        />
      </div>
    );
  };

  const renderEditModal = () => {
    const onCancel = () => {
      setIsEditDialogOpen(false);
      setEditUrlData({});
    };
    return (
      <Modal
        isOpen={isEditDialogOpen}
        onRequestClose={onCancel}
        style={modalStyle}
      >
        <h3 style={{ marginBottom: 20 }}>Edit {editUrlData?.name}</h3>
        <TextInput
          style={{ marginBottom: 10 }}
          label="Url"
          placeholder="https://google.com/test/"
          value={editUrlData?.originalLink || ""}
          onChange={(val) =>
            setEditUrlData({
              ...editUrlData,
              originalLink: val.toLocaleString(),
            })
          }
        />
        <TextInput
          label="Name"
          placeholder="Another short url"
          value={editUrlData?.name || ""}
          onChange={(val) =>
            setEditUrlData({
              ...editUrlData,
              name: val.toLocaleString(),
            })
          }
        />
        <div
          style={{ marginTop: 20, display: "flex", flexDirection: "column" }}
        >
          <Button
            label="Update"
            onClick={async () => {
              if (editUrlData?.urlCode) {
                await updateAndEditUrlCode(editUrlData);
                snackBarStore.showSnackBar("updated succesfully", "success");
                urlStore.fetchUrlsForUser();
                onCancel();
              }
            }}
            variant="outlined-primary"
            style={{ marginBottom: 10 }}
          />
          <Button
            label="Cancel"
            onClick={onCancel}
            variant="outlined-secondary"
          />
        </div>
      </Modal>
    );
  };

  const renderAddNewUrl = () => {
    return (
      <section className="add-url">
        <div className="cont5">
          <form action="#">
            <TextInput
              placeholder="Paste URL here..."
              onChange={(val) =>
                (newUrlPayload.originalLink = val.toLocaleString())
              }
              value={newUrlPayload.originalLink}
              className="url"
            />
            <br />

            <TextInput
              value={newUrlPayload.name || ""}
              placeholder="url name"
              onChange={(val) => (newUrlPayload.name = val.toLocaleString())}
            />

            <TextInput
              placeholder="Type custom url"
              className="alias"
              onChange={(val) =>
                (newUrlPayload.customUrlCode = val.toLocaleString())
              }
              value={newUrlPayload.customUrlCode || ""}
            />
            <br />
            <button
              type="submit"
              onClick={() => {
                createNewUrl();
              }}
            >
              Trim URL <img src={magicwand} alt="" />{" "}
            </button>
            <p>
              By clicking TRIM URL, I agree to the{" "}
              <b>Terms of Service, Privacy policy</b> and Use of cookies
            </p>
          </form>
        </div>
      </section>
    );
  };

  return (
    <div className="dashboard">
      {showUrlAddView && renderAddNewUrl()}
      {Boolean(urlData.length) ? renderAddNewButton() : renderEmptyState()}
      {urlDataLoading && <h3>Loading...</h3>}

      {Boolean(urlData.length) && !urlDataLoading && (
        <>
          {renderEditModal()} <h3 className="shortened">Shortened url list</h3>
          <UrlTable
            columns={tableColumn}
            rows={urlData.map((_) =>
              convertRowDataToTableData(_, setEditUrlData, setIsEditDialogOpen)
            )}
          />
        </>
      )}
    </div>
  );
});

const renderBarcode = (barcodeData: string | null) => {
  if (barcodeData) {
    return (
      <img
        src={barcodeData}
        alt="Barcode"
        style={{ width: "50px", height: "auto" }}
      />
    );
  }
  return null;
};

const tableColumn = [
  { label: "Name", field: "name", hideLabel: false },
  { label: "Link", field: "urlCode" },
  { label: "Visit", field: "visitCount" },
  { label: "Added date", field: "createdAt" },
  { label: "Barcode", field: "barcodeData" },
  {
    label: "Actions",
    field: "actions",
    hideLabelinMobile: true,
    hideLabelInMobile: false,
  },
];

const convertRowDataToTableData = (
  data: UrlType,
  setEditUrlData: React.Dispatch<
    React.SetStateAction<Partial<UrlType> | undefined>
  >,
  setIsEditDialogOpen: React.Dispatch<React.SetStateAction<boolean>>
) => {
  return {
    ...data,
    urlCode: `http://localhost:5000/api/url/${data.urlCode}`,
    createdAt: moment(data.createdAt).format("l"),
    actions: renderActions(data, setEditUrlData, setIsEditDialogOpen),
    barcodeData: renderBarcode(data.barcodeData),
  };
};

const renderActions = (
  data: UrlType,
  setEditUrlData: React.Dispatch<
    React.SetStateAction<Partial<UrlType> | undefined>
  >,
  setIsEditDialogOpen: React.Dispatch<React.SetStateAction<boolean>>
): React.ReactNode => {
  return (
    <div
      style={{
        display: "flex",
        maxWidth: 140,
        justifyContent: "space-between",
      }}
    >
      <Button
        label="Edit"
        variant="outlined-primary"
        onClick={() => {
          setEditUrlData(data);
          setIsEditDialogOpen(true);
        }}
      />
      <Button
        label="Delete"
        variant="outlined-secondary"
        onClick={() => {
          if (
            window.confirm(`Are you sure you want to delete: ${data.name}?`)
          ) {
            urlStore.deleteUrl(data.urlCode);
          }
        }}
      />
    </div>
  );
};

const modalStyle = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    maxWidth: 500,
    width: "100%",
    transform: "translate(-50%, -50%)",
  },
  overlay: {
    background: "rgba(0, 0, 0, .5)",
  },
};

export default Dashboard;
