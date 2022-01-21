import React from "react";
import { Base, SurveyModel } from "survey-core";
import { SurveyResultsItemModel, SurveyResultsModel } from "@survey/creator";
import { attachKey2click, SurveyElementBase, SvgIcon } from "survey-react-ui";
import { ActionButton } from "./ActionButton";

interface ISurveyResultsProps {
  survey: SurveyModel;
}
export class SurveyResults extends SurveyElementBase<
  ISurveyResultsProps,
  any
> {
  model: SurveyResultsModel;
  constructor(props: ISurveyResultsProps) {
    super(props);
    if (props.survey) {
      this.model = new SurveyResultsModel(props.survey);
    }
  }

  protected getStateElement(): Base {
    return this.model;
  }

  render(): JSX.Element {
    if (!this.model) {
      return null;
    }
    return (
      <div className="svd-test-results">
        <div className="svd-test-results__header">
          <div className="svd-test-results__header-text">{this.model.surveyResultsText}</div>
          <div className="svd-test-results__header-types">
            <ActionButton
              click={() => this.model.selectTableClick()}
              text={this.model.getLocString("ed.surveyResultsTable")}
              selected={this.model.isTableSelected}
              disabled={false}
            ></ActionButton>
            <ActionButton
              click={() => this.model.selectJsonClick()}
              text={this.model.getLocString("ed.surveyResultsJson")}
              selected={this.model.isJsonSelected}
              disabled={false}
            ></ActionButton>
          </div>
        </div>
        {this.renderResultAsText()}
        {this.renderResultAsTable()}
      </div>
    );
  }
  renderResultAsText(): JSX.Element {
    if (this.model.resultViewType !== "text") {
      return null;
    }
    return (
      <div className="svd-test-results__text svd-light-bg-color">
        <div>{this.model.resultText}</div>
      </div>
    );
  }
  renderResultAsTable(): JSX.Element {
    if (this.model.resultViewType !== "table") {
      return null;
    }
    return (
      <div className="svd-test-results__table svd-light-bg-color">
        <table>
          <thead>
            <tr className="svd-light-background-color">
              <th className="svd-dark-border-color">
                {this.model.resultsTitle}
              </th>
              <th className="svd-dark-border-color">
                {this.model.resultsDisplayValue}
              </th>
            </tr>
          </thead>
          <tbody>{SurveyResults.renderRows(this.model.resultData)}</tbody>
        </table>
      </div>
    );
  }
  static renderRows(data: Array<any>): Array<JSX.Element> {
    return data.map((item) => <SurveyResultsByRow key={item.id} row={item} />);
  }
}

export class SurveyResultsByRow extends SurveyElementBase<any, any> {
  private get row(): SurveyResultsItemModel {
    return this.props.row;
  }

  protected getStateElement(): Base {
    return this.row;
  }

  render(): JSX.Element {
    return (
      <>
        {attachKey2click(<tr onClick={() => this.row.toggle()}>
          <td
            style={{ paddingLeft: "calc(" + (6 + 2 * this.row.lvl) + " * 8px)" }}
            className="svd-dark-border-color">

            {this.row.isNode ? (
              <span
                style={{ left: "calc(" + (3.5 + 2 * this.row.lvl) + " * 8px)" }}
                className={"svd-test-results__marker " + (this.row.collapsed ? "" : "svd-test-results__marker--expanded")}>
                <SvgIcon
                  iconName={"icon-expand_16x16"}
                  size={16}
                ></SvgIcon>
              </span>
            ) : null}

            <span>{this.row.title}</span>
          </td>
          <td className={this.row.isNode ? "svd-test-results__node-value" : "svd-dark-border-color"}>
            {this.row.getString(this.row.displayValue)}
          </td>
        </tr>)}
        {this.row.isNode && !this.row.collapsed ? SurveyResults.renderRows(this.row.data) : null}
      </>
    );
  }
}
