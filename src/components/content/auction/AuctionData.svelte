<script>
    import { faGem } from '@fortawesome/free-solid-svg-icons';
    import { Icon } from 'utils/imports/components';
</script>

<!-- This example requires Tailwind CSS v2.0+ -->
<div class="flex flex-col">
    <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
        <div class="shadow overflow-hidden bg-red-700 border-black border-2 rounded-md">
          <table class="min-w-full divide-y divide-black">
            <thead class="bg-red-700">
              <tr>
                <th scope="col" class="px-1 py-3 text-left font-bold text-lg uppercase tracking-wider">
                  Item
                </th>
                <th scope="col" class="px-1 py-3 text-left font-bold text-lg uppercase tracking-wider">
                  <select class="block w-full form-select bg-gray-300 border-black border-2 rounded-md bg-opacity-50 font-bold text-black h-12" id="grid-state">
                    <option value="">-- Category --</option>
                  </select>
                </th>
                <th scope="col" class="px-1 py-3 font-bold text-lg uppercase tracking-wider text-right">
                  Price
                </th>
                <th scope="col" class="hidden md:table-cell px-1 py-3 font-bold text-lg uppercase tracking-wider text-right">
                  Count
                </th>
                <th scope="col" class="hidden md:table-cell px-1 py-3 font-bold text-lg uppercase tracking-wider text-right">
                  Updated
                </th>
              </tr>
            </thead>
            <tbody class="bg-red-700 divide-y divide-gray-200">
              <tr>
                <td class="px-1 py-1 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="flex-shrink-0 h-10 w-10">
                      <img class="h-10 w-10 rounded-full" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60" alt="">
                    </div>
                    <div class="ml-4">
                      <div class="text-sm font-medium text-gray-900">
                        Jane Cooper
                      </div>
                      <div class="text-sm text-gray-500">
                        jane.cooper@example.com
                      </div>
                    </div>
                  </div>
                </td>
                <td class="px-1 py-1 whitespace-nowrap">
                  <div class="text-sm text-gray-900">Regional Paradigm Technician</div>
                  <div class="text-sm text-gray-500">Optimization</div>
                </td>
                <td class="px-1 py-1 whitespace-nowrap text-right">
                  1,000,000 <Icon data={faGem} scale="1.5" class="text-blue-700 w-4"></Icon>
                </td>
                <td class="px-1 py-1 whitespace-nowrap text-right hidden md:table-cell">
                  100
                </td>
                <td class="px-1 py-1 whitespace-nowrap text-right hidden md:table-cell">
                    two hours ago
                  </td>
              </tr>
  
              <!-- More people... -->
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
