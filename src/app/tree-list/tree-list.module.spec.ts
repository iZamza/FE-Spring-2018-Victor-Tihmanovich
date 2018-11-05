import { TreeListModule } from './tree-list.module';

describe('TreeListModule', () => {
  let treeListModule: TreeListModule;

  beforeEach(() => {
    treeListModule = new TreeListModule();
  });

  it('should create an instance', () => {
    expect(treeListModule).toBeTruthy();
  });
});
