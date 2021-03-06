import React from 'react';
import {Scrollbars} from "react-custom-scrollbars";
import {CardHeaderTitleMeasures, NoSearchResults, SearchBar, TooltipInfo} from "../../containers/generalContainers";

let CategoriesWithMeasuresRender = ({searchQuery, onChangeSearchQuery, filteredCategoriesThatHaveMeasures, onClickRenderCategoryMeasures}) => (
    <div className="card animated fadeIn delay-0.9s">
        <CardHeaderTitleMeasures
            title='Station measurements by category'
            label='Select a category to show all station metrics for that category.'
        />
        <div className="card-body py-0">
            <div className="row my-1">
                <div className="col-10 mx-0">
                    <div className="input-group my-0 py-0">
                        <SearchBar
                            name='searchQuery'
                            value={searchQuery}
                            handler={onChangeSearchQuery}
                            placeHolder='Category search...'
                        />
                    </div>
                </div>
                <div className="col-1 d-flex align-items-center">
                    <TooltipInfo
                        id='collections'
                        text='In this field is given the option to search for a category.'
                        place='left'
                    />
                </div>
            </div>
            <Scrollbars autoHeight autoHeightMin={200} autoHeightMax={250}>
                <React.Fragment>
                    {filteredCategoriesThatHaveMeasures.length ?
                        filteredCategoriesThatHaveMeasures.map(category => (
                            <div key={category.id} onClick={() => onClickRenderCategoryMeasures(category.id, category.stations)} className="make-border point">
                                <div>
                                    <h5 className='mb-2'>
                                        <i className="mr-2 text-primary fas fa-edit"/>
                                        {category.name}&nbsp;
                                    </h5>
                                    <p className='mb-1'>Total stations with measurements in the category :&nbsp;
                                        <span className="badge badge-warning badge-pill">{category.stations.length}</span>
                                    </p>
                                </div>
                            </div>
                        ))
                    :
                        <NoSearchResults/>
                    }
                </React.Fragment>
            </Scrollbars>
        </div>
    </div>
);

export default CategoriesWithMeasuresRender