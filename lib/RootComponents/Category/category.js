import React, { Fragment } from 'react';
import { number, shape, string } from 'prop-types';
import { useCategory } from '@magento/peregrine/lib/talons/RootComponents/Category';
import { useStyle } from '@magento/venia-ui/lib/classify.js';
import { Meta } from '@magento/venia-ui/lib/components/Head';
import ErrorView from '@magento/venia-ui/lib/components/ErrorView';
import { GET_PAGE_SIZE } from '@magento/venia-ui/lib/RootComponents/Category/category.gql';
import { mergeClasses } from '@magento/venia-ui/lib/classify';
import { fullPageLoadingIndicator } from '@magento/venia-ui/lib/components/LoadingIndicator';
import CategoryContent from '@magento/venia-ui/lib/RootComponents/Category/categoryContent';
import defaultClasses from '@magento/venia-ui/lib/RootComponents/Category/category.module.css';
import {Helmet} from "react-helmet-async";

const Category = props => {
    const { id } = props;

    const talonProps = useCategory({
        id,
        queries: {
            getPageSize: GET_PAGE_SIZE
        }
    });

    const {
        error,
        metaDescription,
        loading,
        categoryData,
        pageControl,
        sortProps,
        pageSize,
        alternateLinks
    } = talonProps;

    const classes = useStyle(defaultClasses, props.classes);

    if (!categoryData) {
        if (error && pageControl.currentPage === 1) {
            if (process.env.NODE_ENV !== 'production') {
                console.error(error);
            }

            return <ErrorView />;
        }
    }
    console.log('ggg')
console.log(alternateLinks)
    console.log('hhhhh')
    return (
    <Fragment>
            <Meta name="description" content={metaDescription} />
            <Helmet>
                {alternateLinks}
            </Helmet>
            <CategoryContent
                categoryId={id}
                classes={classes}
                data={categoryData}
                isLoading={loading}
                pageControl={pageControl}
                sortProps={sortProps}
                pageSize={pageSize}
            />
        </Fragment>
    );
};

Category.propTypes = {
    classes: shape({
        gallery: string,
        root: string,
        title: string
    }),
    id: number
};

Category.defaultProps = {
    id: 3
};

export default Category;
