import {
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { AbstractControl } from '@angular/forms';
import * as d3 from 'd3';
import { FormStateMachine } from 'src/app/form-state-machine.service';

interface TreeNode {
  name: string;
  children?: TreeNode[];
}

@Component({
  selector: 'app-tree-graph',
  templateUrl: './tree-graph.component.html',
  styleUrls: ['./tree-graph.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TreeGraphComponent implements OnInit {
  @Input() formStateMachine: FormStateMachine;

  @ViewChild('graphContainer', { read: ElementRef }) graphContainer: ElementRef;

  constructor() {}

  categoryLabel = 'GROUP';

  ngOnInit() {
    const graphData = this.prepareDataForGraph(this.formStateMachine);
    this.drawD3Tree(this.graphContainer.nativeElement, graphData);
  }

  prepareDataForGraph(formStateMachine: FormStateMachine): TreeNode {
    const stateNames = (vformStateMachine: FormStateMachine) => {
      if (!vformStateMachine.switcher || !vformStateMachine.switcher.length) {
        return null;
      }

      return vformStateMachine.switcher.map((switcher) => {
        return {
          name: `${this.categoryLabel}: ${this.getControlName(switcher.control)}`,
          children: Object.keys(switcher.states).map(
            (state) => {
              return {
                name: state,
                children: stateNames(
                  switcher.states[state]
                ),
              };
            }
          ),
        };
      });
    };

    return {
      name: 'Allowed states',
      children: stateNames(formStateMachine),
    };
  }

  getControlName(c: AbstractControl): string | null {
    const formGroup = c.parent.controls;
    return Object.keys(formGroup).find((name) => c === formGroup[name]) || null;
  }

  drawD3Tree(container, treeData: TreeNode) {
    // set the dimensions and margins of the diagram
    const margin = { top: 40, right: 90, bottom: 50, left: 90 },
      width = 1000 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

    // declares a tree layout and assigns the size
    const treemap = d3.tree().size([width, height]);

    //  assigns the data to a hierarchy using parent-child relationships
    let nodes = d3.hierarchy(treeData);

    // maps the node data to the tree layout
    nodes = treemap(nodes);

    // append the svg obgect to the body of the page
    // appends a 'group' element to 'svg'
    // moves the 'group' element to the top left margin
    const svg = d3
        .select(container)
        .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom),
      g = svg
        .append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    // adds the links between the nodes
    const link = g
      .selectAll('.link')
      .data(nodes.descendants().slice(1))
      .enter()
      .append('path')
      .attr('class', 'link')
      .attr('d', function (d) {
        return (
          'M' +
          d.x +
          ',' +
          d.y +
          'C' +
          d.x +
          ',' +
          (d.y + d.parent.y) / 2 +
          ' ' +
          d.parent.x +
          ',' +
          (d.y + d.parent.y) / 2 +
          ' ' +
          d.parent.x +
          ',' +
          d.parent.y
        );
      });

    const categoryLabel = this.categoryLabel;

    // adds each node as a group
    const node = g
      .selectAll('.node')
      .data(nodes.descendants())
      .enter()
      .append('g')
      .attr('class', function (d) {
        return 'node' + (d.children ? ' node--internal' : ' node--leaf') + (d.data.name.includes(categoryLabel) ? ' category' : '');
      })
      .attr('transform', function (d) {
        return 'translate(' + d.x + ',' + d.y + ')';
      });

    // adds the circle to the node
    node.append('circle').attr('r', 10);

    // adds the text to the node
    node
      .append('text')
      .attr('dy', '.35em')
      .attr('y', function (d) {
        return d.children ? -20 : 20;
      })
      .style('text-anchor', 'middle')
      .text(function (d) {
        return d.data.name;
      });
  }
}
