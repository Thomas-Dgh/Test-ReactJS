import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ProductForm from "../Add/ProductForm";
import { Link } from "react-router-dom";
import { createProduct } from "../../../actions/products";

class AddFormContainer extends Component {
  render() {
    const { categories, dispatch } = this.props;

    return (
      <>
        <Link to="/">Home</Link>
        <ProductForm
          onSave={(data) => {
            dispatch(createProduct(data));
          }}
          categories={categories}
        />
      </>
    );
  }
}

AddFormContainer.propTypes = {
  categories: PropTypes.array,
};

const mapStateToProps = (state) => {
  return {
    categories: state.categories,
  };
};

export default connect(mapStateToProps)(AddFormContainer);
